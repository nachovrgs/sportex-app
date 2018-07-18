//import libraries
import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image
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

import { screens } from "../../screens";

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
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  _keyExtractor = (item, index) => item.eventID.toString();

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      refreshing: false,
      noNotificationsShowed: false
    };
    this.loadData();
  }

  _renderItem = ({ item }) => (
    <NotificationContainer
      notificationItem={item}
      navigator={this.props.navigator}
    />
  );

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(
      `${API_URI}/eventInvitation/GetEventInvitationsReceived/${
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
            isLoading: false,
            isError: true,
            error: "Network response was not ok.",
            token: ""
          });
          return new Error("Network response was not ok.");
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
          dataSource: jsonResponse,
          isLoading: false,
          error: "",
          token: ""
        });
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
  toggleNoNotificationsShowed = () => {
    this.state.noNotificationsShowed = true;
  };
  _refreshListView = () => {
    this.setState({ refreshing: true });
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
        <View style={styles.container}>
          <Text>{this.state.error}</Text>
        </View>
      </Root>
    ) : this.state.dataSource.length == 0 ? (
      <Root>
        <View style={styles.noEventsContainer}>
          <View style={styles.noEventsSubContainer}>
            <Image
              style={styles.noEventsImage}
              source={require("../../assets/images/ok.png")}
            />
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
