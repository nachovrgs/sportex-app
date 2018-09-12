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
import { NotificationContainer } from "../../components";

import I18n from "../../i18n";
import { screens } from "../../screens";

import { getNotifications, saveNotifications } from "../../helpers/store";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class NotificationFeed extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    tabBarHidden: true,
    navBarButtonColor: colors.text_orange,
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  _keyExtractor = (item, index) => item.id.toString();
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../../assets/images/broom.png"),
        id: "clean",
        buttonColor: "#ecf0f1",
        buttonFontSize: 15,
        buttonFontWeight: "600"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      token: "",
      refreshing: false,
      noNotificationsShowed: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "clean") {
        this.cleanAll();
      }
    }
  }
  componentDidMount() {
    this.getStorageNotifications();
  }

  async getStorageNotifications() {
    this.setState({ refreshing: true });
    var notifications = await getNotifications();
    this.setState({
      dataSource: notifications
    });
    this.loadFromStorage();
  }
  //Item renderer
  _renderItem = ({ item }) => (
    <NotificationContainer
      notificationItem={item}
      navigator={this.props.navigator}
      removeNotification={this.removeNotification}
    />
  );
  async loadFromStorage() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    this.loadData();
  }
  async loadData() {
    fetch(
      `${API_URI}/notification/profilenotificationsunseen/${
        this.state.profileId
      }`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            (this.state.token ? this.state.token.replace(/"/g, "") : "")
        }
      }
    )
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
        if (jsonResponse.length == 0 && !this.state.noNotificationsShowed) {
          Toast.show({
            text: "No hay notificaciones.",
            buttonText: "Ok",
            onClose: this.toggleNoNotificationsShowed
          });
        }
        this.setState({
          dataSource: jsonResponse.slice(0, 30),
          refreshing: false
        });
        saveNotifications(jsonResponse.slice(0, 30));
      })
      .catch(error => {
        this.setState({
          refreshing: false
        });
        Toast.show({
          text: "Ocurrio un error",
          buttonText: "Ok"
        });
      });
  }
  cleanAll = () => {
    fetch(`${API_URI}/notification/setallseen/${this.state.profileId}`, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          this._refreshListView();
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
      .catch(error => {
        this.setState({
          refreshing: false
        });
        Toast.show({
          text: "Ocurrio un error",
          buttonText: "Ok"
        });
      });
  };

  removeNotification = notificationId => {
    fetch(`${API_URI}/notification/setseen/${notificationId}`, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          this._refreshListView();
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
      .catch(error => {
        this.setState({
          refreshing: false
        });
        Toast.show({
          text: "Ocurrio un error",
          buttonText: "Ok"
        });
      });
  };

  toggleNoNotificationsShowed = () => {
    this.state.noNotificationsShowed = true;
  };
  _refreshListView = async () => {
    this.setState({
      refreshing: true
    });
    await this.loadData();
  };
  _refreshControl() {
    return (
      <RefreshControl
        title={I18n.t("notif_searching")}
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
          <View style={styles.noEventsSubContainer}>
            <TouchableOpacity
              style={styles.noEventsSubContainer}
              onPress={() => this._refreshListView()}
            >
              <Image
                style={styles.noEventsImage}
                source={require("../../assets/images/ok.png")}
              />
            </TouchableOpacity>
          </View>
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
