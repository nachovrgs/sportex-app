//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";
import { Icon, Thumbnail } from "native-base";
import { colors } from "../../styles";
import styles from "./styles";

// create a component
export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {}
    };
    this.loadLocation = this.loadLocation.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this.state.item = this.props.eventItem;
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

  render() {
    const event = this.state.item;
    if (JSON.stringify(event) != JSON.stringify({})) {
      let creator;
      if (event.creatorProfile.picturePath == "") {
        creator = (
          <Thumbnail
            source={require("../../assets/images/profile.png")}
            style={styles.profilePic}
          />
        );
      } else {
        creator = (
          <Thumbnail
            source={{ uri: event.creatorProfile.picturePath }}
            style={styles.profilePic}
          />
        );
      }
      return (
        <TouchableOpacity
          onPress={() => this.handlePress()}
          style={styles.container}
        >
          <View style={styles.sidebar} />
          <View style={styles.mainInfo}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{event.eventName}</Text>
            </View>
            <View style={styles.userContainer}>
              {creator}
              <Text style={styles.user}>
                {event.creatorProfile.account.username}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Icon name="time" style={styles.timeIcon} />
              <Text style={styles.time}>
                {event.startingTime.split("T")[1]}
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
                {event.countStarters} / {event.maxStarters}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}
