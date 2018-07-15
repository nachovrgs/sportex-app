//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { Icon, Button, Thumbnail } from "native-base";
import { CurrentEventCard, ExpandedCurrentEventCard } from "../../components";
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";
import { API_URI } from "../../constants";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";

import { colors } from "../../styles";
import styles from "./styles";

// create a component
class CurrentEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      expanded: false,
      token: "",
      profileId: null,
      containerHeight: 120
    };
    this.handlePress = this.handlePress.bind(this);
    this.selectBackgroundColor = this.selectBackgroundColor.bind(this);

    //Load Stuff
    this.loadStorageItems();
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.eventItem,
      coords: {}
    });
    this.selectBackgroundColor();
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  //Helpers
  async loadStorageItems() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
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

  handlePress = () => {
    this.setState({
      containerHeight: this.getContainerHeight(),
      expanded: !this.state.expanded
    });
  };

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
  getContainerHeight = () => {
    return this.state.containerHeight == 220 ? 120 : 220;
  };
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
        <View
          style={[styles.container, { height: this.state.containerHeight }]}
        >
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
              <View style={styles.fillContainer}>
                <Text style={styles.fill}>
                  <Icon name="contacts" style={styles.fillIcon} />
                  {event.countStarters} / {event.maxStarters}
                </Text>
              </View>
            </View>
            <View styles={styles.map} />
          </TouchableOpacity>
          {this.state.expanded && (
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
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}
export default CurrentEventContainer;
