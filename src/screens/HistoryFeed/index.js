//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image
} from "react-native";
import { Container, Header, Content, Toast, Button, Root } from "native-base";
import { PastEventContainer } from "../../components";

import { screens } from "../../screens";

import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class HistoryFeed extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarButtonColor: colors.text_orange,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  static navigatorButtons = {};
  _keyExtractor = (item, index) => item.id.toString();

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      profileId: "",
      refreshing: false,
      noEventsShowed: false,
      initial: true
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.loadData();
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
    }
  }
  _renderItem = ({ item }) => (
    <PastEventContainer eventItem={item} navigator={this.props.navigator} />
  );

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(`${API_URI}/event/past/${this.state.profileId}`, {
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
            text: "No jugaste ningun partido! Inscribite a uno.",
            buttonText: "Ok",
            onClose: this.toggleNoEventsShowed
          });
        }
        this.setState({
          dataSource: jsonResponse,
          isLoading: false,
          error: "",
          token: ""
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
  toggleNoEventsShowed = () => {
    this.state.noEventsShowed = true;
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
    ) : this.state.dataSource.length == 0 ? (
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
