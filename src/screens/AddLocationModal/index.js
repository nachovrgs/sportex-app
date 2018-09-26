//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Clipboard,
  ActivityIndicator
} from "react-native";

import I18n from "../../i18n";
import { Navigation } from "react-native-navigation";
import { Root, Toast, Icon } from "native-base";
import { Button, Rating } from "react-native-elements";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";
import { API_URI } from "../../constants";
import MapView from "react-native-maps";

// create a component
export default class AddLocationModal extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    tabBarHidden: true
  };

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require("../../assets/images/exit.png"),
        id: "close",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ],
    rightButtons: [
      {
        icon: require("../../assets/images/add.png"),
        id: "add",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      callback: null,
      isLoading: true,
      latitude: 0,
      longitude: 0,
      coordinate: null,
      locationName: ""
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.setState({
      token: this.props.token,
      callback: this.props.callback,
      isLoading: false
    });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinate: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.addLocationAction();
      } else if (event.id == "close") {
        this.close();
      }
    }
  }
  //Helper methods
  addLocationAction = () => {
    this.setState({
      isLoading: true
    });
    fetch(`${API_URI}/Location`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Name: this.state.locationName,
        Description: "",
        Latitude: this.state.coordinate.latitude,
        Longitude: this.state.coordinate.longitude
      })
    })
      .then(response => {
        if (response.ok) {
          console.log("Location Created");
          //Event created going to feed
          this.state.callback();
          this.close();
        } else {
          console.log("Network response was not ok.");
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
        console.log(error);
        this.setState({
          isLoading: false,
          isError: true,
          error: error.message,
          token: ""
        });
        throw error;
      });
  };
  //UI
  close() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  onNameChanged(text) {
    this.setState({ locationName: text });
  }
  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.background} animating />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.inputHolder}>
          <Text style={styles.label}>{I18n.t("add_location_name")}</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.content}
              onChangeText={text => this.onNameChanged(text)}
              autoCorrect={false}
              value={this.state.locationName}
            />
          </View>
        </View>

        <MapView
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          scrollEnabled={true}
          liteMode={true}
          style={styles.map}
        >
          <MapView.Marker
            draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={e =>
              this.setState({ coordinate: e.nativeEvent.coordinate })
            }
          >
            <Image
              source={require("../../assets/images/location.png")}
              style={styles.markerImage}
            />
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}
