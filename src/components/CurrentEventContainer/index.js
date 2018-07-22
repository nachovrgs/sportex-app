//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { Icon, Button, Thumbnail } from "native-base";
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
      token: "",
      profileId: null,
      containerHeight: 120
    };
    this.handlePress = this.handlePress.bind(this);

    //Load Stuff
    this.loadStorageItems();
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.eventItem,
      coords: {}
    });
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  //Helpers
  async loadStorageItems() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
  }

  handlePress = () => {
    var event = this.state.item;
    //Go to event modal
    this.props.navigator.showModal({
      screen: screens.event.id,
      title: screens.event.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.event.backButtonHidden,
      passProps: {
        eventItemId: event.id
      }
    });
  };

  render() {
    const event = this.state.item;
    if (JSON.stringify(event) != JSON.stringify({})) {
      const date = new Date(event.startingTime.split("T")[0]).toDateString();
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
            <View style={styles.mainInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{date}</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.name}>{event.eventName}</Text>
              </View>
              <View style={styles.userContainer}>
                {creator}
                <Text style={styles.user}>
                  {event.creatorProfile.account.username}
                </Text>
              </View>
            </View>
            <View style={styles.sideInfo}>
              <View style={styles.hourContainer}>
                <Text style={styles.hour}>
                  {event.startingTime.split("T")[1].split(":")[0]} hs
                </Text>
              </View>
              <View style={styles.fillContainer}>
                <Text style={styles.fill}>
                  <Icon name="contacts" style={styles.fillIcon} />
                  {event.countStarters} / {event.maxStarters}
                </Text>
              </View>
            </View>
            <View styles={styles.map} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }
}
export default CurrentEventContainer;
