//import libraries
import React, { Component } from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import geolib from "geolib";

import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { getTokenForUsage } from "../../helpers/storage";

import { logInfo, logError } from "../../helpers/logger";
import { colors } from "../../styles";

// create a component
export default class EventScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    tabBarHidden: true
  };
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../../assets/images/trash.png"),
        id: "delete",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      isLoading: false,
      isError: false,
      error: "",
      token: ""
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.loadData();
  }
  async loadData() {
    this.state.token = await getTokenForUsage();
  }
  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.eventItem
    });
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "delete") {
        fetch(`${API_URI}/event/${this.state.item.id}`, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              (this.state.token ? this.state.token.replace(/"/g, "") : "")
          }
        })
          .then(response => {
            if (response.ok) {
              //Event deleted, going to feed
              this.props.navigator.push({
                screen: screens.eventFeed.id,
                title: screens.eventFeed.title,
                animated: true,
                animationType: "fade",
                backButtonHidden: screens.eventFeed.backButtonHidden
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
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  //Helpers

  render() {
    const event = this.state.item;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.timeContainer}>
            <Image
              style={styles.eventImage}
              source={require("../../assets/images/time.png")}
            />
            <Text style={styles.time}>{event.startingTime}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.eventName}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}
