//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import geolib from "geolib";
import { Icon, Thumbnail } from "native-base";
import { Button } from "react-native-elements";
import { CurrentEventCard, ExpandedCurrentEventCard } from "../../components";
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";
import { API_URI } from "../../constants";

import Swipeable from "react-native-swipeable";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";

import { colors } from "../../styles";
import styles from "./styles";

// create a component
class PastEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      token: null,
      profileId: null,
      evaluation: 0,
      reviewExist: false
    };
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
    this.checkIfEvaluationExists();
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

  canEvaluate() {
    return true;
  }
  checkIfEvaluationExists = () => {
    fetch(`${API_URI}/playerReview/reviewexists`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        IdEvent: this.state.item.id,
        IdProfileReviews: this.state.profileId
      })
    })
      .then(response => {
        if (response.ok) {
          console.log(JSON.stringify(response));
          this.setState({ reviewExist: response });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //UI
  handleReviewPress = () => {
    this.props.navigator.showModal({
      screen: screens.rateEventModal.id,
      title: screens.rateEventModal.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.rateEventModal.backButtonHidden,
      passProps: {
        event: this.state.item,
        profileId: this.state.profileId,
        token: this.state.token,
        callback: () => this.callback()
      }
    });
  };

  render() {
    const event = this.state.item;

    if (JSON.stringify(event) != JSON.stringify({})) {
      const rightButtons = this.state.reviewExist
        ? []
        : [
            <TouchableHighlight
              style={styles.swipeContainerRemove}
              onPress={() => this.handleReviewPress()}
            >
              <View>
                <Image
                  style={styles.swiperImage}
                  source={require("../../assets/images/review.png")}
                />
                <Text style={styles.swipertext}>Evaluar</Text>
              </View>
            </TouchableHighlight>
          ];
      return (
        <Swipeable rightButtons={rightButtons}>
          <View style={styles.container}>
            <View style={styles.avatarHolder}>
              <Image
                style={styles.avatar}
                source={{
                  uri:
                    event.creatorProfile.picturePath &&
                    event.creatorProfile.picturePath != ""
                      ? event.creatorProfile.picturePath
                      : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                }}
              />
            </View>
            <View style={styles.dataHolder}>
              <Text style={styles.name}>{event.eventName}</Text>
              <Text style={styles.time}>
                {event.startingTime.split("T")[1]}
              </Text>
            </View>
            <View style={styles.info}>
              {!this.state.reviewExist && (
                <View>
                  <Image
                    style={styles.dotImage}
                    source={require("../../assets/images/mark.png")}
                  />
                  <Text style={styles.dotText}>Swipe</Text>
                </View>
              )}
            </View>
          </View>
        </Swipeable>
      );
    } else {
      return null;
    }
  }
}
export default PastEventContainer;
