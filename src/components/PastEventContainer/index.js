//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";
import { Icon, Thumbnail } from "native-base";
import { Button } from "react-native-elements";
import { CurrentEventCard, ExpandedCurrentEventCard } from "../../components";
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";
import { API_URI } from "../../constants";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";

import { Rating } from "react-native-elements";

import { colors } from "../../styles";
import styles from "./styles";

// create a component
class PastEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      expanded: false,
      token: "",
      profileId: null,
      containerHeight: 120,
      evaluation: 0
    };
    this.handlePress = this.handlePress.bind(this);
    this.selectBackgroundColor = this.selectBackgroundColor.bind(this);
    this.loadStorageItems = this.loadStorageItems.bind(this);

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

  getContainerHeight = () => {
    return this.state.containerHeight == 220 ? 120 : 220;
  };
  handlePress = () => {
    this.setState({
      containerHeight: this.getContainerHeight(),
      expanded: !this.state.expanded
    });
  };
  canEvaluate() {
    return true;
  }
  storeEvaluation = rating => {
    this.setState({
      evaluation: rating
    });
  };
  evaluateAction = () => {
    fetch(`${API_URI}/playerReview/ReviewAllEventParticipants`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Rate: this.state.evaluation,
        Message: "",
        IdProfileReviews: this.state.profileId,
        IdProfileReviewed: 0,
        EventID: this.state.item.id
      })
    })
      .then(response => {
        if (response.ok) {
          this.props.navigator.push({
            screen: screens.historyFeed.id,
            title: screens.historyFeed.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.historyFeed.backButtonHidden
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
            <View styles={styles.map} />
          </TouchableOpacity>
          {this.state.expanded && (
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Rating
                  type="star"
                  ratingCount={5}
                  fractions={0}
                  startingValue={event.rating ? event.rating : 0}
                  imageSize={30}
                  onFinishRating={this.storeEvaluation}
                  showRating={event.rating ? true : false}
                  style={{ paddingVertical: 10 }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  success
                  onPress={this.evaluateAction}
                  title="Evaluar"
                />
              </View>
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}
export default PastEventContainer;
