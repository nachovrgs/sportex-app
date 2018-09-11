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
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";
import Swipeable from "react-native-swipeable";
import styles from "./styles";

// create a component
class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {}
    };
    this.handleRemovePress = this.handleRemovePress.bind(this);
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

  handleRemovePress() {
    this.props.removeNotification(this.state.item.id);
  }
  render() {
    const notification = this.state.item;

    const rightButtons = [
      <TouchableHighlight
        style={styles.swipeContainerRemove}
        onPress={() => this.handleRemovePress()}
      >
        <Image
          style={styles.swiperImage}
          source={require("../../assets/images/can.png")}
        />
      </TouchableHighlight>
    ];
    if (JSON.stringify(notification) != JSON.stringify({})) {
      return (
        <Swipeable rightButtons={rightButtons}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{notification.message}</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>
                  {notification.createdOn.split("T")[1].split(":")[0]} :{" "}
                  {notification.createdOn.split("T")[1].split(":")[1]} hs
                </Text>
              </View>
            </View>
            <View style={styles.info}>
              <Image
                style={styles.dotImage}
                source={require("../../assets/images/dot.png")}
              />
            </View>
          </View>
        </Swipeable>
      );
    } else {
      return null;
    }
  }
}
export default NotificationContainer;
