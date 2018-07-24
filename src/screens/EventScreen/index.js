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
  CardItem,
  Root
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
    navBarHidden: true,
    tabBarHidden: true
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
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      showingPlayers: true,
      isOwner: false,
      editMode: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.exitAction = this.exitAction.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
    this.toggleShowingPlayers = this.toggleShowingPlayers.bind(this);
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
  close() {
    this.props.navigator.dismissAllModals({
      animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
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
          error: "",
          isOwner: jsonResponse.standardProfileID == this.state.profileId
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

  deleteAction = () => {
    fetch(`${API_URI}/event/${this.state.itemId}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          //Event deleted. Rereshing
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

  //add
  addAction = () => {
    this.props.navigator.showModal({
      screen: screens.addPlayersSelectionModal.id,
      title: screens.addPlayersSelectionModal.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.addPlayersSelectionModal.backButtonHidden,
      passProps: {
        eventId: this.state.itemId
      }
    });
  };
  canAdd() {
    return true;
  }
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
  toggleShowingPlayers() {
    this.setState({
      showingPlayers: !this.state.showingPlayers
    });
  }
  render() {
    const event = this.state.item;
    if (JSON.stringify(event) != JSON.stringify({})) {
      const isOwner = this.state.isOwner;
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
      const date = event.startingTime
        ? new Date(event.startingTime.split("T")[0]).toDateString()
        : new Date().toDateString();
      return this.state.isLoading ? (
        <Root>
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={colors.background}
              animating
            />
          </View>
        </Root>
      ) : this.state.isError ? (
        <Root>
          <View style={styles.noEventsContainer}>
            <View style={styles.noEventsSubContainer}>
              <Image
                style={styles.noEventsImage}
                source={require("../../assets/images/no_internet.png")}
              />
              <Text style={styles.noEventsText}>
                No tienes conexion a internet.
              </Text>
            </View>
          </View>
        </Root>
      ) : (
        <Root>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.headInfo}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{event.eventName}</Text>
                  {isOwner && (
                    <TouchableOpacity
                      onPress={() => this.setState({ editMode: true })}
                    >
                      <Image
                        style={styles.ownerEditButton}
                        source={require("../../assets/images/edit.png")}
                      />
                    </TouchableOpacity>
                  )}
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
              <View style={styles.headOptions}>
                <TouchableOpacity onPress={() => this.close()}>
                  <Image
                    style={styles.closeImage}
                    source={require("../../assets/images/exit.png")}
                  />
                </TouchableOpacity>
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
                {this.state.showingPlayers && (
                  <Text style={styles.footerTitle}>Jugadores</Text>
                )}
                {!this.state.showingPlayers && (
                  <Text style={styles.footerTitle}>Suplentes</Text>
                )}
              </View>
              <View style={styles.playersContainer}>
                <DeckSwiper
                  dataSource={cards}
                  style={styles.swiper}
                  onSwipeRight={this.toggleShowingPlayers}
                  onSwipeLeft={this.toggleShowingPlayers}
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
                                  {
                                    participant.profileParticipant.account
                                      .username
                                  }
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
                                        participant.profileParticipant
                                          .picturePath
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
                {!isOwner && (
                  <Button
                    block
                    rounded
                    danger
                    onPress={this.exitAction}
                    disabled={!this.canExit()}
                  >
                    <Text>Salir</Text>
                  </Button>
                )}
                {isOwner && (
                  <View>
                    <Button
                      block
                      rounded
                      success
                      onPress={this.addAction}
                      disabled={!this.canAdd()}
                    >
                      <Text>Agregar Jugadores</Text>
                    </Button>
                    <Button
                      block
                      rounded
                      danger
                      style={styles.exitButton}
                      onPress={this.deleteAction}
                    >
                      <Text>Eliminar</Text>
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Root>
      );
    } else {
      return null;
    }
  }
}
