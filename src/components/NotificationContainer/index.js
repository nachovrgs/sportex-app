//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";

import styles from "./styles";

// create a component
class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {}
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this.setState({
      item: this.props.notificationItem,
      coords: {}
    });
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  //Helpers
  handlePress() {}
  render() {
    const notification = this.state.item;
    if (JSON.stringify(notification) != JSON.stringify({})) {
      return (
        <TouchableOpacity
          onPress={() => this.handlePress()}
          style={styles.container}
        >
          <View style={styles.head}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{notification.Message}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}
export default NotificationContainer;
