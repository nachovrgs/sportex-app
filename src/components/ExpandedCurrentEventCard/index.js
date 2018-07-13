//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { Icon, Button, Thumbnail } from "native-base";
import { API_URI } from "../../constants";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { colors } from "../../styles";
import styles from "./styles";
import { screens } from "../../screens";

// create a component
export default class ExpandedCurrentEventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      token: "",
      profileId: null
    };
    this.loadLocation = this.loadLocation.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.loadStorageItems();
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.eventItem,
      coords: {}
    });
    this.loadLocation();
    this.selectBackgroundColor();
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
  async loadStorageItems() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
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
  selectBackgroundColor() {
    if (this._mounted) {
      var backColors = [
        colors.bar_rank_1,
        colors.bar_rank_2,
        colors.bar_rank_3
      ];
      return backColors[Math.floor(Math.random() * backColors.length)];
    }
  }
  handlePress() {
    this.props.onclick();
  }
  canExit() {
    return true;
  }
  exitAction = () => {
    fetch(`${API_URI}/event/LeaveEvent`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idProfile: this.state.profileId,
        idEvent: this.state.item.id
      })
    })
      .then(response => {
        if (response.ok) {
          //Event joined. Rereshing
          this.props.navigator.push({
            screen: screens.currentEventFeed.id,
            title: screens.currentEventFeed.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.currentEventFeed.backButtonHidden
          });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };
  render() {
    const event = this.state.item;
    if (JSON.stringify(this.state.item) != JSON.stringify({})) {
      let creator;
      if (this.state.item.creatorProfile.picturePath == "") {
        creator = (
          <Thumbnail
            source={require("../../assets/images/profile.png")}
            style={styles.profilePic}
          />
        );
      } else {
        creator = (
          <Thumbnail
            source={{ uri: this.state.item.creatorProfile.picturePath }}
            style={styles.profilePic}
          />
        );
      }
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.allContainer}
            onPress={() => this.handlePress()}
          >
            <View style={styles.sidebar} />
            <View style={styles.mainInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.state.item.eventName}</Text>
              </View>
              <View style={styles.userContainer}>
                {creator}
                <Text style={styles.user}>
                  {this.state.item.creatorProfile.account.username}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Icon name="time" style={styles.timeIcon} />
                <Text style={styles.time}>
                  {this.state.item.startingTime.split("T")[1]}
                </Text>
              </View>
            </View>
            <View style={styles.sideInfo}>
              <View style={styles.locationContainer}>
                <Image
                  style={styles.eventImage}
                  source={require("../../assets/images/location.png")}
                />
                <Text style={styles.location}>{this.getDistance()} km</Text>
              </View>
              <View style={styles.fillContainer}>
                <Text style={styles.fill}>
                  <Icon name="contacts" style={styles.fillIcon} />
                  {this.state.item.countStarters} /{" "}
                  {this.state.item.maxStarters}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.button}>
            <Button
              block
              success
              onPress={this.exitAction}
              disabled={!this.canExit()}
            >
              <Text>Salir</Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
