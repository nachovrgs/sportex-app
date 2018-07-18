//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import geolib from "geolib";
import MapView from "react-native-maps";
import {
  DeckSwiper,
  Card,
  CardItem,
  Icon,
  Button,
  Thumbnail,
  List,
  ListItem,
  Left,
  Body
} from "native-base";
import { CurrentEventCard, ExpandedCurrentEventCard } from "../../components";
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";
import { API_URI } from "../../constants";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { colors, sizes } from "../../styles";
import styles from "./styles";

// create a component
class EventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      expanded: false,
      token: "",
      profileId: null,
      containerHeight: sizes.itemCard
    };
    this.handlePress = this.handlePress.bind(this);
    //Load Stuff
    this.loadStorageItems();
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.eventItem ? this.props.eventItem : this.state.item,
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

  canJoin() {
    return true;
  }
  joinAction = () => {
    fetch(`${API_URI}/event/JoinEvent`, {
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
            screen: screens.eventFeed.id,
            title: screens.eventFeed.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.eventFeed.backButtonHidden
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
  goToProfile(profileId) {
    this.props.navigator.push({
      screen: screens.profileScreen.id,
      title: screens.profileScreen.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.profileScreen.backButtonHidden,
      passProps: {
        profileId: profileId
      }
    });
  }
  getContainerHeight = () => {
    return this.state.containerHeight == sizes.itemCardExpanded
      ? sizes.itemCard
      : sizes.itemCardExpanded;
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
        },
        {
          type: 3
        }
      ];
      const list = event.listStarters;
      let marker = {
        latitude: event.location.latitude ? event.location.latitude : 37.78825,
        longitude: event.location.longitude ? event.location.longitude : -37.78825
      }
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
          </TouchableOpacity>
          {this.state.expanded && (
            <View style={styles.mapRegion}>
              <DeckSwiper
                dataSource={cards}
                style={styles.swiper}
                renderItem={item => (
                  <Card style={styles.swiperCard}>
                    {item.type == 1 && (
                      <View style={styles.mapContainer}>
                        <MapView
                          initialRegion={{
                            latitude: event.location.latitude ? event.location.latitude : 37.78825,
                            longitude: event.location.longitude ? event.location.longitude : -37.78825,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                          }}
                          scrollEnabled={false}
                          liteMode={true}
                          style={styles.map}
                        />
                      </View>
                    )}
                    {item.type == 2 && (
                      <ScrollView>
                        {list.length > 0 && (<List>
                          {list.map((participant, i) => (
                            <ListItem avatar>
                              <TouchableOpacity
                                onPress={() => this.goToProfile(participant.standardProfileID)}
                              >
                                <Left>
                                  <Thumbnail
                                    style={styles.participantIcon}
                                    source={{ uri: participant.profileParticipant.picturePath }}
                                  />
                                </Left>
                              </TouchableOpacity>
                              <Body>
                                <Text style={styles.participantName}>
                                  {participant.profileParticipant.account.username}
                                </Text>
                              </Body>
                            </ListItem>
                          ))}
                        </List>)}
                        {list.length == 0 && (
                          <Text>No hay jugadores</Text>
                        )}
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
          )}
          {this.state.expanded && (
            <View style={styles.button}>
              <Button
                block
                success
                onPress={this.joinAction}
                disabled={!this.canJoin()}
              >
                <Text>Unirse</Text>
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
export default EventContainer;
