//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { EventCard, ExpandedEventCard } from "../../components";
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";

import { colors } from "../../styles";
import styles from "./styles";

// create a component
class EventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      coords: {},
      expanded: false
    };
    this.handlePress = this.handlePress.bind(this);
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
    this.setState({ expanded: this.state.expanded ? false : true });
    this.forceUpdate();
  };

  render() {
    const item = this.state.item;
    if (JSON.stringify(item) != JSON.stringify({})) {
      return this.state.expanded ? (
        <ExpandedEventCard
          eventItem={item}
          navigator={this.props.navigator}
          onclick={this.handlePress}
        />
      ) : (
        <EventCard
          eventItem={item}
          navigator={this.props.navigator}
          onclick={this.handlePress}
        />
      );
    } else {
      return null;
    }
  }
}
export default EventContainer;
