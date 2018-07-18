//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";

import styles from "./styles";

// create a component
class GroupContainer extends Component {
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
      item: this.props.groupItem,
      coords: {}
    });
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  //Helpers
  handlePress() {
    var group = this.state.item;
    this.props.navigator.push({
      screen: screens.groupScreen.id,
      title: screens.groupScreen.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.groupScreen.backButtonHidden,
      passProps: {
        groupId: group.id
      }
    });
  }
  render() {
    const group = this.state.item;
    if (JSON.stringify(group) != JSON.stringify({})) {
      return (
        <TouchableOpacity
          onPress={() => this.handlePress()}
          style={styles.container}
        >
          <View style={styles.head}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{group.groupName}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{group.groupDescription}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}
export default GroupContainer;
