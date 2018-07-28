//import libraries
import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl
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
import { EventContainer } from "../../components";
import { screens } from "../../screens";

import { GroupContainer } from "../../components";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

import { getGroups, saveGroups } from "../../helpers/store";
// create a component
export default class Groups extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarButtonColor: colors.text_orange,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../../assets/images/add.png"),
        id: "add",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ],
    leftButtons: [
      {
        icon: require("../../assets/images/bell.png"),
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
      refreshing: false,
      noEventsShowed: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.getStorageGroups();
  }

  async getStorageGroups() {
    this.setState({ refreshing: true });
    var groups = await getGroups();

    this.setState({
      dataSource: groups
    });
    this.loadData();
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.props.navigator.push({
          screen: screens.createGroup.id,
          title: screens.createGroup.title,
          animated: true,
          animationType: "fade",
          backButtonHidden: screens.createGroup.backButtonHidden
        });
      } else if (event.id == "notifications") {
        this.props.navigator.push({
          screen: screens.notificationFeed.id,
          title: screens.notificationFeed.title,
          animated: true,
          animationType: "fade",
          backButtonHidden: screens.notificationFeed.backButtonHidden
        });
      }
    }
  }
  _renderItem = ({ item }) => (
    <GroupContainer groupItem={item} navigator={this.props.navigator} />
  );

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(`${API_URI}/group/Joined/${this.state.profileId}`, {
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
            text: "No hay grupos! Crea uno.",
            buttonText: "Ok",
            onClose: this.toggleNoEventsShowed
          });
        }
        this.setState({
          dataSource: jsonResponse,
          refreshing: false
        });
        saveGroups(jsonResponse);
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
        title="buscando tus grupos"
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
            style={styles.groupList}
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </Root>
    );
  }
}
