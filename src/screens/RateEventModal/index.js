//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Clipboard
} from "react-native";

import { Navigation } from "react-native-navigation";
import { Root, Toast } from "native-base";
import { Button, Rating } from "react-native-elements";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";
import { API_URI } from "../../constants";

// create a component
export default class RateEventModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      token: null,
      evaluation: 0,
      isLoading: false,
      callback: null
    };
  }

  componentDidMount() {
    this.setState({
      event: this.props.event,
      profileId: this.props.profileId,
      token: this.props.token,
      callback: this.props.callback,
      callbackIndividual: this.props.callbackIndividual
    });
  }
  //Helper methods
  evaluateAction = () => {
    this.setState({ isLoading: true });
    this.state.callback(this.state.evaluation);
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  };
  evaluateIndividualAction = evaluations => {
    this.setState({ isLoading: true });
    this.state.callbackIndividual(evaluations);
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  };
  //UI
  rateIndividualsAction = async () => {
    this.props.navigator.showModal({
      screen: screens.rateIndividualModal.id,
      title: screens.rateIndividualModal.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.rateIndividualModal.backButtonHidden,
      passProps: {
        event: this.state.event,
        token: this.state.token,
        callback: evaluation => this.evaluateIndividualAction(evaluation)
      }
    });
  };

  storeEvaluation = rating => {
    this.setState({
      evaluation: rating
    });
  };
  close() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  render() {
    const event = this.state.event;
    if (JSON.stringify(event) != JSON.stringify({})) {
      return (
        <View style={styles.container}>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => this.close()}>
              <Image
                style={styles.closeImage}
                source={require("../../assets/images/exit.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Evalua tu partido!</Text>
            <Text style={styles.subtitle}>
              Puedes evaluar a todos por igual, o individualmente a cada jugador
            </Text>
          </View>
          <View style={styles.buttonHolder}>
            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={5}
                fractions={0}
                startingValue={0}
                imageSize={30}
                onFinishRating={this.storeEvaluation}
                showRating={false}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <Button
              title="Evaluar"
              onPress={this.evaluateAction}
              titleStyle={{ fontWeight: "700" }}
              loading={this.state.isLoading}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              buttonStyle={styles.buttonEv}
            />
            <Button
              title="Evaluar Individualmente"
              onPress={this.rateIndividualsAction}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={styles.buttonInd}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}