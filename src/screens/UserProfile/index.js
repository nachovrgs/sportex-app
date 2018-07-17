//import libraries
import React, { Component } from "react";
import { View, Text } from "react-native";

import { screens } from "../../screens";

import { Avatar } from "react-native-elements";
import {
  getTokenForUsage,
  getAccountIdForUsage,
  resetAndLogout
} from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class UserProfile extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require("../../assets/images/logout.png"),
        id: "logout",
        buttonColor: "#ecf0f1",
        buttonFontSize: 50,
        buttonFontWeight: "900"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      accountID: ""
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.loadData();
  }

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.accountID = await getAccountIdForUsage();
    fetch(`${API_URI}/standardProfile/account/${this.state.accountID}`, {
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
        this.setState({
          profile: jsonResponse,
          isLoading: false,
          error: ""
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

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "logout") {
        resetAndLogout();
      }
    }
  }
  render() {
    const profile = this.state.profile;
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.imageContainer}>
              <Avatar
                large
                rounded
                source={{
                  uri: profile.picturePath
                    ? profile.picturePath
                    : "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                }}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{profile.firstName}</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{profile.lastName}</Text>
              <Text style={styles.title}>{profile.mailAddress}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
