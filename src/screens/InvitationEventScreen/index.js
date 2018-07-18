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
export default class InvitationEventScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
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
      token: "",
      eventInvitation: {}
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.acceptAction = this.acceptAction.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.item,
      eventInvitation: this.props.eventInvitation
    });
    this.loadState()
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
  async loadState() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
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
  acceptAction = () => {
    console.log(JSON.stringify({
      idProfileReceived: this.state.profileId,
      idProfileSent: this.state.eventInvitation.idProfileInvites,
      idEvent: this.state.eventInvitation.eventID,
      idGroup: 0
    }))
    fetch(`${API_URI}/eventInvitation/AcceptEventInvitation`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idProfileReceived: this.state.profileId,
        idProfileSent: this.state.eventInvitation.idProfileInvites,
        idEvent: this.state.eventInvitation.eventID,
        idGroup: 0
      })
    })
      .then(response => {
        console.log(JSON.stringify(response))
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
                <Text style={styles.subtitle}>{date}</Text>
                <Text style={styles.splitter}>|</Text>
                <Text style={styles.hour}>
                  {" "}
                  | {event.startingTime.split("T")[1].split(":")[0]} hs
                </Text>
              </View>
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
              <DeckSwiper
                dataSource={cards}
                style={styles.swiper}
                renderItem={item => (
                  <Card style={styles.swiperCard}>
                    {item.type == 1 && (
                      <ScrollView>
                        <List>
                          {starters.map((participant, i) => (
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
                onPress={this.acceptAction}
                disabled={!this.canExit()}
              >
                <Text>Unirme</Text>
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
