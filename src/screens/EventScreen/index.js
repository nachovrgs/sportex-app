//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from "react-native";
import geolib from "geolib";
import { Thumbnail, List, ListItem, Left, Body, Button } from "native-base";
import { screens } from "../../screens";
import styles from "./styles";

import { API_URI } from "../../constants";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { logInfo, logError } from "../../helpers/logger";
import { colors } from "../../styles";

// create a component
export default class EventScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    tabBarHidden: true,
    navBarHidden: true
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
    this.state.profileId = await getProfileIdForUsage();
  }
  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.eventItem
    });
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "delete") {
        fetch(`${API_URI}/event/${this.state.item.id}`, {
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
                screen: screens.eventFeed.id,
                title: screens.eventFeed.title,
                animated: true,
                animationType: "fade",
                backButtonHidden: screens.eventFeed.backButtonHidden
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
  returnBack() {
    this.props.navigator.push({
      screen: screens.currentEventFeed.id,
      title: screens.currentEventFeed.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.currentEventFeed.backButtonHidden
    });
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
    if (JSON.stringify(event) != JSON.stringify({})) {
      const list =
        event.listStarters.length == 0
          ? [
              {
                account: {
                  username: "Amy Farha"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              },
              {
                account: {
                  username: "Chris Jackson"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              },
              {
                account: {
                  username: "Juan Jackson"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              },
              {
                account: {
                  username: "Pedro Jackson"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              },
              {
                account: {
                  username: "Carlos Jackson"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              },
              {
                account: {
                  username: "Marcos Jackson"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              },
              {
                account: {
                  username: "Esteban Jackson"
                },
                picturePath:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              }
            ]
          : event.listStarters;
      const date = new Date(event.startingTime.split("T")[0]).toDateString();
      return (
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.headInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{event.eventName}</Text>
              </View>
              <View style={styles.subTitleContainer}>
                <Text style={styles.subtitle}>{date}</Text>
                <Text style={styles.splitter}>|</Text>
                <Text style={styles.hour}>
                  {" "}
                  | {event.startingTime.split("T")[1].split(":")[0]} hs
                </Text>
              </View>
            </View>
            <View style={styles.headOptions}>
              <TouchableOpacity
                style={styles.exitIconContainer}
                onPress={() => this.returnBack()}
              >
                <Image
                  style={styles.exitIcon}
                  source={require("../../assets/images/exit.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.map}>
              <Image
                style={styles.mapImage}
                source={require("../../assets/images/maps.png")}
              />
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{event.description}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerTitleContainer}>
              <Text style={styles.footerTitle}>Jugadores</Text>
            </View>
            <View style={styles.playersContainer}>
              <ScrollView>
                <List>
                  {list.map((participant, i) => (
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          style={styles.participantIcon}
                          source={{ uri: participant.picturePath }}
                        />
                      </Left>
                      <Body>
                        <Text style={styles.participantName}>
                          {participant.account.username}
                        </Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </ScrollView>
            </View>
            <View style={styles.button}>
              <Button
                block
                success
                onPress={this.exitAction}
                disabled={!this.canExit()}
              >
                <Text>Unirse</Text>
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
