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
import { Container, Header, Content, Toast, Button, Root } from "native-base";
import { PastEventContainer } from "../../components";

import { screens } from "../../screens";

import { getTokenForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class HistoryFeed extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
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
      refreshing: false,
      noEventsShowed: false
    };
    this.loadData();
  }
  _renderItem = ({ item }) => (
    <PastEventContainer eventItem={item} navigator={this.props.navigator} />
  );

  async loadData() {
    Promise.all([getTokenForUsage()]).then(([token]) => {
      this.state.token = token;
      fetch(`${API_URI}/event/`, {
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
              text: "No hay eventos! Inscribite a uno.",
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
          this._refreshListView();
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
              source={require("../../assets/images/none.png")}
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
