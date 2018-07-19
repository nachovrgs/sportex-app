//import libraries
import React, { Component } from "react";
import { View, Text } from "react-native";

import { screens } from "../../screens";
import { Thumbnail } from "native-base";
import {
  getTokenForUsage,
  getAccountIdForUsage,
  resetAndLogout
} from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class ProfileScreen extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      profileId: null,
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      accountID: ""
    };
  }

  componentDidMount() {
    this.setState({
      profileId: this.props.profileId
    });
    this.loadData();
  }

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.accountID = await getAccountIdForUsage();
    fetch(`${API_URI}/StandardProfile/${this.state.profileId}`, {
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
  render() {
    const profile = this.state.profile;
    if (JSON.stringify(profile) != JSON.stringify({})) {
      let image;
      if (profile.picturePath == "") {
        image = (
          <Thumbnail
            source={require("../../assets/images/profile.png")}
            style={styles.avatar}
          />
        );
      } else {
        image = (
          <Thumbnail
            source={{ uri: profile.picturePath }}
            style={styles.avatar}
          />
        );
      }
      return (
        <View style={styles.background}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.imageContainer}>{image}</View>
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
    } else {
      return null;
    }
  }
}
