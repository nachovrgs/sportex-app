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
import { EventContainer } from "../../components";
import NotificationsIOS from "react-native-notifications";

import { screens } from "../../screens";

import {
  getTokenForUsage,
  getProfileIdForUsage,
  getAccountIdForUsage
} from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class EventFeed extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center",
    navBarHidden: false,
    tabBarHidden: false
  };
  static navigatorButtons = {
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
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      profileId: 0,
      accountId: 0,
      refreshing: false,
      noEventsShowed: false,
      initial: true,
      allowVerticalScroll: true,
      readyForApi: false
    };
    this.loadAll();
    NotificationsIOS.addEventListener(
      "remoteNotificationsRegistered",
      this.onPushRegistered.bind(this)
    );
    NotificationsIOS.addEventListener(
      "remoteNotificationsRegistrationFailed",
      this.onPushRegistrationFailed.bind(this)
    );
    NotificationsIOS.requestPermissions();

    this._boundOnNotificationReceivedForeground = this.onNotificationReceivedForeground.bind(
      this
    );
    this._boundOnNotificationReceivedBackground = this.onNotificationReceivedBackground.bind(
      this
    );
    this._boundOnNotificationOpened = this.onNotificationOpened.bind(this);

    NotificationsIOS.addEventListener(
      "notificationReceivedForeground",
      this._boundOnNotificationReceivedForeground
    );
    NotificationsIOS.addEventListener(
      "notificationReceivedBackground",
      this._boundOnNotificationReceivedBackground
    );
    NotificationsIOS.addEventListener(
      "notificationOpened",
      this._boundOnNotificationOpened
    );
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  //Notifications
  onPushRegistered(deviceToken) {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log("Token: " + deviceToken);
    this.sendNotificationsToken(deviceToken);
  }

  onPushRegistrationFailed(error) {
    console.log(error);
  }

  componentWillUnmount() {
    // prevent memory leaks!
    NotificationsIOS.removeEventListener(
      "remoteNotificationsRegistered",
      this.onPushRegistered.bind(this)
    );
    NotificationsIOS.removeEventListener(
      "remoteNotificationsRegistrationFailed",
      this.onPushRegistrationFailed.bind(this)
    );
    // Don't forget to remove the event listeners to prevent memory leaks!
    NotificationsIOS.removeEventListener(
      "notificationReceivedForeground",
      this._boundOnNotificationReceivedForeground
    );
    NotificationsIOS.removeEventListener(
      "notificationReceivedBackground",
      this._boundOnNotificationReceivedBackground
    );
    NotificationsIOS.removeEventListener(
      "notificationOpened",
      this._boundOnNotificationOpened
    );
  }
  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    console.log(
      "Notification Received - Foreground. Message",
      notification.getMessage()
    );
    console.log(
      "Notification Received - Foreground. Data",
      notification.getData()
    );
  }

  onNotificationReceivedBackground(notification) {
    console.log("Notification Received - Background", notification);
    console.log(
      "Notification Received - Background. Message",
      notification.getMessage()
    );
    console.log(
      "Notification Received - Background. Data",
      notification.getData()
    );
  }

  onNotificationOpened(notification) {
    console.log("Notification opened by device user", notification);
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "notifications") {
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
    <EventContainer
      eventItem={item}
      navigator={this.props.navigator}
      scroll={this.SwipeScrollEvent.bind(this)}
    />
  );
  SwipeScrollEvent(allowParentScroll) {
    if (this.state.allowVerticalScroll != allowParentScroll) {
      this.setState({ allowVerticalScroll: allowParentScroll });
    }
  }

  async loadStorageItems() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    this.state.accountId = await getAccountIdForUsage();
    this.state.readyForApi = true;
  }

  async loadAll() {
    await this.loadStorageItems();
    await this.loadData();
  }

  async sendNotificationsToken(deviceToken) {
    fetch(`${API_URI}/Account/token/${this.state.accountId}`, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Token: deviceToken
      })
    })
      .then(response => {
        if (response.ok) {
          this.setState({
            isLoading: false,
            error: ""
          });
        } else {
          this.setState({
            isLoading: false,
            isError: true,
            error: "Network response was not ok.",
            token: ""
          });
          return new Error("Network response was not ok.");
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
          error: error.message,
          token: ""
        });
        throw error;
      });
  }

  async loadData() {
    if (this.state.readyForApi) {
      this.state.dataSource = [];
      this.state.isLoading = true;
      fetch(`${API_URI}/event/avaiable/${this.state.profileId}`, {
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
              isLoading: false,
              isError: true,
              error: "Network response was not ok.",
              token: ""
            });
            return new Error("Network response was not ok.");
          }
        })
        .then(jsonResponse => {
          if (jsonResponse.length == 0 && !this.state.noEventsShowed) {
            Toast.show({
              text: "No hay partidos! Crea uno.",
              buttonText: "Ok",
              onClose: this.toggleNoEventsShowed
            });
          }
          this.setState({
            dataSource: jsonResponse,
            isLoading: false,
            error: ""
          });
          if (this.state.initial) {
            this.setState({ initial: false });
            this._refreshListView();
          }
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            isError: true,
            error: error.message,
            token: ""
          });
          throw error;
        });
    }
  }

  toggleNoEventsShowed = () => {
    this.state.noEventsShowed = true;
  };

  _refreshListView = () => {
    this.setState({
      refreshing: true
    });
    this.loadData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._refreshListView()}
      />
    );
  }
  render() {
    return this.state.isLoading ? (
      <Root>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ecf0f1" animating />
        </View>
      </Root>
    ) : this.state.isError ? (
      <Root>
        <View style={styles.noEventsContainer}>
          <View style={styles.noEventsSubContainer}>
            <Image
              style={styles.noEventsImage}
              source={require("../../assets/images/no_internet.png")}
            />
            <Text style={styles.noEventsText}>
              No tienes conexion a internet.
            </Text>
          </View>
        </View>
      </Root>
    ) : !this.state.refreshing && this.state.dataSource.length == 0 ? (
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
