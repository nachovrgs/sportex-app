//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { Icon, Button, Thumbnail } from "native-base";
import { colors } from "../../styles";
import styles from "./styles";

// create a component
export default class ExpandedEventCard extends Component {
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
  canJoin() {
    return false;
  }
  joinAction = () => {
    // fetch(`${API_URI}/event/join`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + this.state.token.replace(/"/g, ""),
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     StandardProfileID: 1,
    //     EventName: this.state.name,
    //     Description: this.state.description,
    //     EventType: 1,
    //     StartingTime:
    //       this.cleanDate(this.state.startingDate) +
    //       "T" +
    //       this.cleanTime(this.state.startingTime),
    //     LocationID: 1,
    //     IsPublic: this.state.isPublic ? 1 : 0,
    //     MaxStarters: this.state.maxStarters,
    //     MasSubs: this.state.maxSubs
    //   })
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       console.log("Network response was ok.");
    //       //Event created,oing to feed
    //       this.props.navigator.push({
    //         screen: screens.eventFeed.id,
    //         title: screens.eventFeed.title,
    //         animated: true,
    //         animationType: "fade",
    //         backButtonHidden: screens.eventFeed.backButtonHidden
    //       });
    //     } else {
    //       console.log("Network response was not ok.");
    //       this.setState({
    //         isLoading: false,
    //         isError: true,
    //         error: "Network response was not ok.",
    //         token: ""
    //       });
    //       return new Error("Network response was not ok.");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({
    //       isLoading: false,
    //       isError: true,
    //       error: error.message,
    //       token: ""
    //     });
    //     throw error;
    //   });
  };
  render() {
    const event = this.state.item;
    if (JSON.stringify(event) != JSON.stringify({})) {
      let creator;
      if (event.creatorProfile.picturePath == "") {
        creator = <Icon name="contact" />;
      } else {
        creator = (
          <Thumbnail source={{ uri: event.creatorProfile.picturePath }} />
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
          <View style={styles.button}>
            <Button
              block
              success
              onPress={this.joinAction}
              disabled={!this.canJoin}
            >
              <Text>Unirse</Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
