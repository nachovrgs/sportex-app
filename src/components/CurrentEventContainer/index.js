//import libraries
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import geolib from "geolib";

import { CurrentEventCard, ExpandedCurrentEventCard } from "../../components";
import { screens } from "../../screens";
import { navigate } from "../../helpers/navigation";

import { colors } from "../../styles";
import styles from "./styles";

// create a component
class CurrentEventContainer extends Component {
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
    this.state.expanded = !this.state.expanded;
    console.log("Forcing update.");
    this.forceUpdate();
  };
  _renderComponent = () => {
    return (
      <CurrentEventCard
        eventItem={this.state.item}
        navigator={this.props.navigator}
        onclick={this.handlePress}
      />
    );
  };
  _renderExandedComponent = () => {
    return (
      <ExpandedCurrentEventCard
        eventItem={this.state.item}
        navigator={this.props.navigator}
        onclick={this.handlePress}
      />
    );
  };
  render() {
    console.log("Expanded: " + this.state.expanded);
    if (JSON.stringify(this.state.item) != JSON.stringify({})) {
      return this.state.expanded
        ? this._renderExandedComponent()
        : this._renderComponent();
    } else {
      return null;
    }
  }
}
export default CurrentEventContainer;
