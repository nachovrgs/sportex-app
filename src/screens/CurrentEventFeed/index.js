//import libraries
import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Toast,
  Button,
  Text,
  Root
} from "native-base";
import { CurrentEventContainer } from "../../components";

import { getCurrentEvents, saveCurrentEvents } from "../../helpers/store";
import { screens } from "../../screens";

import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class CurrentEventFeed extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarButtonColor: colors.text_orange,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center",
    navBarHidden: false
  };
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../../assets/images/time.png"),
        id: "history",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ],
    leftButtons: [
      {
        icon: require("../../assets/images/mail.png"),
        id: "notifications",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ]
  };
  _keyExtractor = (item, index) => item.id.toString();

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      error: "",
      token: "",
      profileId: "",
      refreshing: false,
      noEventsShowed: false,
      initial: true
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentDidMount() {
    this.getStorageEvents();
  }

  async getStorageEvents() {
    this.setState({ refreshing: true });
    var events = await getCurrentEvents();

    this.setState({
      dataSource: events
    });
    this.loadData();
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case "willAppear":
        break;
      case "didAppear":
        break;
      case "willDisappear":
        break;
      case "didDisappear":
        break;
      case "willCommitPreview":
        break;
    }
    if (event.type == "NavBarButtonPress") {
      if (event.id == "history") {
        this.props.navigator.push({
          screen: screens.historyFeed.id,
          title: screens.historyFeed.title,
          animated: true,
          animationType: "slide-down",
          backButtonHidden: screens.historyFeed.backButtonHidden
        });
      } else if (event.id == "notifications") {
        this.props.navigator.push({
          screen: screens.notificationFeed.id,
          title: screens.notificationFeed.title,
          animated: true,
          animationType: "slide-down",
          backButtonHidden: screens.notificationFeed.backButtonHidden
        });
      }
    }
  }

  _renderItem = ({ item }) => (
    <CurrentEventContainer eventItem={item} navigator={this.props.navigator} />
  );

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(`${API_URI}/event/joined/${this.state.profileId}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : "")
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({
            refreshing: false
          });
          Toast.show({
            text: "Imposible conectarse al servidor. Tienes internet?",
            buttonText: "Ok"
          });
        }
      })
      .then(jsonResponse => {
        if (jsonResponse.length == 0 && !this.state.noEventsShowed) {
          Toast.show({
            text: "No hay partidos! Inscribite a uno.",
            buttonText: "Ok",
            onClose: this.toggleNoEventsShowed
          });
        }
        this.setState({
          dataSource: jsonResponse,
          refreshing: false
        });
        saveCurrentEvents(jsonResponse);
      })
      .catch(error => {
        this.setState({
          refreshing: false
        });
        Toast.show({
          text: "Ocurrio un error!",
          buttonText: "Ok"
        });
      });
  }
  toggleNoEventsShowed = () => {
    this.state.noEventsShowed = true;
  };
  _refreshListView = () => {
    this.setState({ refreshing: true });
    this.loadData();
  };
  _refreshControl() {
    return (
      <RefreshControl
        title="buscando tus eventos"
        titleColor={colors.text_orange}
        refreshing={this.state.refreshing}
        onRefresh={() => this._refreshListView()}
      />
    );
  }
  render() {
    return this.state.dataSource.length == 0 ? (
      <Root>
        <View style={styles.noEventsContainer}>
          <TouchableOpacity
            style={styles.noEventsSubContainer}
            onPress={() => this._refreshListView()}
          >
            <Image
              style={styles.noEventsImage}
              source={require("../../assets/images/none.png")}
            />
            <Text style={styles.noEventsText}>Refrescar</Text>
          </TouchableOpacity>
        </View>
      </Root>
    ) : (
      <Root>
        <View style={styles.container}>
          <FlatList
            refreshControl={this._refreshControl()}
            style={styles.eventList}
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </Root>
    );
  }
}
