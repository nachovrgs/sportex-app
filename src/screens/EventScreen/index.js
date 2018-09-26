//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Platform
} from "react-native";
import geolib from "geolib";
import MapView from "react-native-maps";
import {
  Thumbnail,
  List,
  ListItem,
  Left,
  Body,
  DeckSwiper,
  Card,
  CardItem,
  Picker,
  Root
} from "native-base";

import I18n from "../../i18n";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button } from "react-native-elements";
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
    rightButtons: []
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
      editMode: false,
      isLoadingAction: false,
      locations: [],
      selectedLocation: null
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
    this.loadStorageItems();
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "delete") {
        this.setState({
          isLoading: true
        });
        fetch(`${API_URI}/event/${this.state.item.id}`, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              (this.state.token ? this.state.token.replace(/"/g, "") : "")
          }
        })
          .then(response => {
            this.setState({
              isLoading: false
            });
            if (response.ok) {
              //Event deleted, going to feed
              this.props.navigator.dismissAllModals({
                animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              });
            } else {
              this.setState({
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
  async loadStorageItems() {
    this.setState({
      isLoading: true
    });
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    this.loadEvent();
    await this.loadLocations();
    this.setState({
      isLoading: false
    });
  }

  //API
  async loadEvent() {
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
          selectedLocation: jsonResponse.locationID,
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

  async loadLocations() {
    fetch(`${API_URI}/Location/`, {
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
            isError: true,
            error: "Network response was not ok.",
            token: ""
          });
          return new Error("Network response was not ok.");
        }
      })
      .then(jsonResponse => {
        this.setState({
          locations: jsonResponse,
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
    this.setState({ isLoadingAction: true });
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
          this.setState({ isLoadingAction: false });
          this.props.navigator.dismissAllModals({
            animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
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
    this.setState({ isLoadingAction: true });
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
          this.setState({ isLoadingAction: false });
          this.props.navigator.dismissAllModals({
            animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
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

  //UI
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
  changeEventName(text) {
    var item = this.state.item;
    item.eventName = text;
    this.setState({ item: item });
  }
  //Date
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    var item = this.state.item;
    var time = this.state.item.startingTime.split("T")[1];
    item.startingTime = this.cleanDate(date) + "T" + time;
    this.setState({ item: item });
    this._hideDateTimePicker();
  };
  //Time
  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = time => {
    var item = this.state.item;
    var date = this.state.item.startingTime.split("T")[0];
    item.startingTime = date + "T" + this.cleanTime(time);
    this.setState({ item: item });
    this._hideTimePicker();
  };

  cleanDate = date => {
    if (date) {
      var day =
        String(date.getDate()).length == 1
          ? "0" + date.getDate() + 1
          : date.getDate() + 1 == 32
            ? date.getDate()
            : date.getDate() + 1;
      var month =
        String(date.getMonth()).length == 1
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      return year + "-" + month + "-" + day;
    }
  };

  cleanTime = time => {
    if (time) {
      var hour =
        String(time.getHours()).length == 1
          ? "0" + time.getHours()
          : time.getHours();
      var minute =
        String(time.getMinutes()).length == 1
          ? "0" + time.getMinutes()
          : time.getMinutes();
      var second =
        String(time.getSeconds()).length == 1
          ? "0" + time.getSeconds()
          : time.getSeconds();
      return hour + ":" + minute + ":" + second;
    }
  };
  onValueChangeLocations(value) {
    var item = this.state.item;
    item.locationID = value;
    item.location = this.findLocation(value);
    this.setState({
      item: item,
      selectedLocation: value
    });
  }
  findLocation = locationId => {
    const { locations } = this.state.locations;
    var location = null;
    this.state.locations.forEach(async element => {
      if (element.id == locationId) {
        location = element;
      }
    });
    return location;
  };

  submitChanges = () => {
    fetch(`${API_URI}/event/${this.state.itemId}`, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.item)
    })
      .then(response => {
        if (response.ok) {
          //reload
          this.loadEvent();
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
  toggleShowingPlayers() {
    this.setState({
      showingPlayers: !this.state.showingPlayers
    });
  }
  startEditing() {
    this.setState({ editMode: true });
  }
  finishEditing() {
    this.setState({ editMode: false });
    this.submitChanges();
  }
  _renderLocationOptionItem = list => {
    d = list.map((data, i) => {
      return <Picker.Item label={data.name} value={data.id} />;
    });
    // i did this because no need in ios :P
    if (Platform.OS === "android") {
      d.unshift(<Picker.Item label="Select" />);
    }
    return d;
    //and that's how you are ready to go, because this issue isn't fixed yet (checked on 28-Dec-2017)
  };

  render() {
    const event = this.state.item;
    const locations = this.state.locations;
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
                {I18n.t("general_no_internet")}
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
                  <View style={styles.titleHolder}>
                    {this.state.editMode && (
                      <TextInput
                        style={styles.titleEdit}
                        onChangeText={text => this.changeEventName(text)}
                        autoCorrect={false}
                        value={event.eventName}
                      />
                    )}
                    {!this.state.editMode && (
                      <Text style={styles.title}>
                        {event.eventName.length > 15
                          ? event.eventName.substring(0, 15 - 3) + "..."
                          : event.eventName}
                      </Text>
                    )}
                  </View>
                  <View style={styles.editHolder}>
                    {isOwner &&
                      !this.state.editMode && (
                        <TouchableOpacity onPress={() => this.startEditing()}>
                          <Image
                            style={styles.ownerEditButton}
                            source={require("../../assets/images/edit.png")}
                          />
                        </TouchableOpacity>
                      )}
                    {isOwner &&
                      this.state.editMode && (
                        <TouchableOpacity onPress={() => this.finishEditing()}>
                          <Image
                            style={styles.ownerEditButton}
                            source={require("../../assets/images/save.png")}
                          />
                        </TouchableOpacity>
                      )}
                  </View>
                </View>
                <View style={styles.subTitleContainer}>
                  {isOwner &&
                    !this.state.editMode && (
                      <View style={styles.subtitle}>
                        <Text style={styles.date}>{date}</Text>
                        <Text style={styles.hour}>
                          {" "}
                          | {
                            event.startingTime.split("T")[1].split(":")[0]
                          } : {event.startingTime.split("T")[1].split(":")[1]}{" "}
                          hs
                        </Text>
                      </View>
                    )}
                  {isOwner &&
                    this.state.editMode && (
                      <View style={styles.subtitle}>
                        <TouchableOpacity onPress={this._showDateTimePicker}>
                          <Text style={styles.date}>{date}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._showTimePicker}>
                          <Text style={styles.hour}>
                            {" "}
                            | {
                              event.startingTime.split("T")[1].split(":")[0]
                            } : {event.startingTime.split("T")[1].split(":")[1]}{" "}
                            hs
                          </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                          isVisible={this.state.isDateTimePickerVisible}
                          onConfirm={this._handleDatePicked}
                          onCancel={this._hideDateTimePicker}
                          minimumDate={new Date()}
                          // maximumDate={new Date().setMonth((new Date().getMonth()+1))}
                        />
                        <DateTimePicker
                          isVisible={this.state.isTimePickerVisible}
                          onConfirm={this._handleTimePicked}
                          onCancel={this._hideTimePicker}
                          minuteInterval={30}
                          mode="time"
                        />
                      </View>
                    )}
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
                {isOwner &&
                  !this.state.editMode && (
                    <Text style={styles.location}>{event.location.name}</Text>
                  )}
                {isOwner &&
                  this.state.editMode && (
                    <Picker
                      mode="dropdown"
                      note={false}
                      style={styles.locationPicker}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.selectedLocation}
                      placeholderStyle={styles.locationPickerItem}
                      onValueChange={this.onValueChangeLocations.bind(this)}
                    >
                      {this._renderLocationOptionItem(locations)}
                    </Picker>
                  )}
              </View>
              <View style={styles.mapContainer}>
                <MapView
                  region={{
                    latitude: event.location.latitude
                      ? event.location.latitude
                      : 37.78825,
                    longitude: event.location.longitude
                      ? event.location.longitude
                      : -37.78825,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                  scrollEnabled={true}
                  liteMode={true}
                  style={styles.map}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: event.location.latitude,
                      longitude: event.location.longitude
                    }}
                    title={"Tu partido"}
                    description={event.location.name}
                  >
                    <Image
                      source={require("../../assets/images/location.png")}
                      style={styles.markerImage}
                    />
                  </MapView.Marker>
                </MapView>
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
                    title="Salir"
                    onPress={this.exitAction}
                    disabled={!this.canExit()}
                    loading={this.state.isLoadingAction}
                    loadingProps={{
                      size: "small",
                      color: "rgba(111, 202, 186, 1)"
                    }}
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={styles.exitButton}
                  />
                )}
                {isOwner && (
                  <View>
                    <Button
                      title="Agregar Jugadores"
                      onPress={this.addAction}
                      disabled={!this.canAdd()}
                      loading={this.state.isLoadingAction}
                      loadingProps={{
                        size: "small",
                        color: "rgba(111, 202, 186, 1)"
                      }}
                      titleStyle={{ fontWeight: "700" }}
                      buttonStyle={styles.addButton}
                    />
                    <Button
                      title="Eliminar"
                      onPress={this.deleteAction}
                      loading={this.state.isLoadingAction}
                      loadingProps={{
                        size: "small",
                        color: "rgba(111, 202, 186, 1)"
                      }}
                      titleStyle={{ fontWeight: "700" }}
                      buttonStyle={styles.exitButton}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </Root>
      );
    } else {
      return (
        <Root>
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={colors.background}
              animating
            />
          </View>
        </Root>
      );
    }
  }
}
