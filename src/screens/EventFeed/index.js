//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";

import { EventContainer } from "../../components";

import { screens } from "../../screens";

import { getTokenForUsage } from "../../helpers/storage";
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
      refreshing: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.loadData();
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.props.navigator.push({
          screen: screens.createEvent.id,
          title: screens.createEvent.title,
          animated: true,
          animationType: "fade",
          backButtonHidden: screens.createEvent.backButtonHidden
        });
      }
    }
  }
  _renderItem = ({ item }) => (
    <EventContainer eventItem={item} navigator={this.props.navigator} />
  );

  async loadData() {
    this.state.token = await getTokenForUsage();
    fetch(`${API_URI}/event/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token.replace(/"/g, "")
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
  _refreshListView = () => {
    console.log("refreshing");
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
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ecf0f1" animating />
      </View>
    ) : this.state.isError ? (
      <View style={styles.container}>
        <Text>{this.state.error}</Text>
      </View>
    ) : this.state.dataSource.length == 0 ? (
      <View style={styles.container}>
        <Text>No hay eventos</Text>
      </View>
    ) : (
      <ScrollView style={styles.container}>
        <FlatList
          refreshControl={this._refreshControl()}
          style={styles.eventList}
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }
}
