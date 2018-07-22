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
import Swipeout from "react-native-swipeout";
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
    this.handleViewPress = this.handleViewPress.bind(this);
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
  handleViewPress() {
    this.props.navigator.push({
      screen: screens.invitationEvent.id,
      title: screens.invitationEvent.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.invitationEvent.backButtonHidden,
      passProps: {
        item: this.state.item.eventInvited,
        eventInvitation: this.state.item
      }
    });
  }
  handleRemovePress() {
    this.props.removeNotification(this.state.item.id);
  }
  render() {
    const notification = this.state.item;

    const rightButtons = [
      <TouchableHighlight
        style={styles.swipeContainerAccept}
        onPress={() => this.handleViewPress()}
      >
        <Image
          style={styles.swiperImage}
          source={require("../../assets/images/eye.png")}
        />
      </TouchableHighlight>,
      <TouchableHighlight
        style={styles.swipeContainerRemove}
        onPress={() => this.handleRemovePress()}
      >
        <Image
          style={styles.swiperImage}
          source={require("../../assets/images/exit.png")}
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
