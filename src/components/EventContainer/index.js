//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import geolib from "geolib";
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
// import { ListItem } from "react-native-elements";
import { CurrentEventCard, ExpandedCurrentEventCard } from "../../components";
import { screens } from "../../screens";
//import MapboxGL from "@mapbox/react-native-mapbox-gl";
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
            <View style={styles.map}>
              <DeckSwiper
                dataSource={cards}
                style={styles.swiper}
                renderItem={item => (
                  <Card style={styles.swiperCard}>
                    {item.type == 1 && (
                      <Image
                        style={styles.mapImage}
                        source={require("../../assets/images/maps.png")}
                      />
                    )}
                    {item.type == 2 && (
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
