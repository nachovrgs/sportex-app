//import libraries
import React, { Component } from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import geolib from "geolib";

import { Avatar } from "react-native-elements";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { getTokenForUsage } from "../../helpers/storage";

import { logInfo, logError } from "../../helpers/logger";
import { colors } from "../../styles";

// create a component
export default class GroupScreen extends Component {
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
    this.loadLocation();
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "delete") {
        fetch(`${API_URI}/group/${this.state.item.id}`, {
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
                screen: screens.groups.id,
                title: screens.groups.title,
                animated: true,
                animationType: "fade",
                backButtonHidden: screens.groups.backButtonHidden
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
  loadLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          item: this.state.item,
          coords: position.coords
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  getDistance() {
    if (
      this._mounted &&
      this.state.coords.longitude &&
      this.state.item.location != null
    ) {
      var distance = geolib.getDistance(this.state.coords, {
        latitude: this.state.item.latitude,
        longitude: this.state.item.longitude
      });
      return parseFloat((distance * 0.00001).toFixed(0));
    }
  }

  render() {
    const group = this.state.item;
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.imageContainer}>
              <Avatar
                large
                rounded
                source={{
                  uri: group.picturePath
                    ? group.picturePath
                    : "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                }}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{group.groupName}</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{group.groupDescription}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
