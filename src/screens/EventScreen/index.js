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
import MapView from "react-native-maps";
import {
  Thumbnail,
  List,
  ListItem,
  Left,
  Body,
  Button,
  DeckSwiper,
  Card,
  CardItem
} from "native-base";
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
    navBarComponentAlignment: "center"
  };
  static navigatorButtons = {
    rightButtons: [
      // {
      //   icon: require("../../assets/images/trash.png"),
      //   id: "delete",
      //   buttonColor: "#ecf0f1",
      //   buttonFontSize: 20,
      //   buttonFontWeight: "600"
      // }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      item: {},
      coords: {},
      isLoading: false,
      isError: false,
      error: "",
      token: ""
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.exitAction = this.exitAction.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      itemId: this.props.eventItemId
    });
    this.loadEvent();
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
  async loadEvent() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(`${API_URI}/event/${this.state.itemId}`, {
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
          item: jsonResponse,
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

  goToProfile(profile) {
    this.props.navigator.push({
      screen: screens.profileScreen.id,
      title: screens.profileScreen.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.profileScreen.backButtonHidden,
      passProps: {
        profileId: profile.standardProfileID
      }
    });
  }

  render() {
    const event = this.state.item;
    if (JSON.stringify(event) != JSON.stringify({})) {
      const cards = [
        {
          type: 1
        },
        {
          type: 2
        }
      ];
      const starters = event.listStarters;
      const substitutes = event.listSubstitutes;
      const date = new Date(event.startingTime.split("T")[0]).toDateString();
      return (
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.headInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{event.eventName}</Text>
              </View>
              <View style={styles.subTitleContainer}>
                <View style={styles.subtitle}>
                  <Text style={styles.date}>{date}</Text>
                  <Text style={styles.hour}>
                    {" "}
                    | {event.startingTime.split("T")[1].split(":")[0]} hs
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>{event.location.name}</Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: event.location.latitude
                    ? event.location.latitude
                    : 37.78825,
                  longitude: event.location.longitude
                    ? event.location.longitude
                    : -37.78825,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
                scrollEnabled={false}
                liteMode={true}
                style={styles.map}
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
              <DeckSwiper
                dataSource={cards}
                style={styles.swiper}
                renderItem={item => (
                  <Card style={styles.swiperCard}>
                    {item.type == 1 && (
                      <ScrollView>
                        {starters.map((participant, i) => (
                          <View style={styles.memberListItem}>
                            <TouchableOpacity
                              style={styles.participantIconContainer}
                              onPress={() => this.goToProfile(participant)}
                            >
                              <Image
                                style={styles.participantIcon}
                                source={require("../../assets/images/profile.png")}
                              />
                            </TouchableOpacity>
                            <View style={styles.participantNameContainer}>
                              <Text style={styles.participantName}>
                                {participant.profileParticipant.account.username}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    )}
                    {item.type == 2 && (
                      <ScrollView>
                        <List>
                          {substitutes.map((participant, i) => (
                            <ListItem avatar>
                              <Left>
                                <Thumbnail
                                  style={styles.participantIcon}
                                  source={{
                                    uri:
                                      participant.profileParticipant.picturePath
                                  }}
                                />
                              </Left>
                              <Body>
                                <Text style={styles.participantName}>
                                  {
                                    participant.profileParticipant.account
                                      .username
                                  }
                                </Text>
                              </Body>
                            </ListItem>
                          ))}
                        </List>
                      </ScrollView>
                    )}
                    {item.type == 3 && (
                      <Text style={styles.eventDescription}>
                        {event.description}
                      </Text>
                    )}
                  </Card>
                )}
              />
            </View>
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
        </View>
      );
    } else {
      return null;
    }
  }
}
