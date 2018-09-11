//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Clipboard,
  ScrollView
} from "react-native";

import { Navigation } from "react-native-navigation";
import { Root, Toast } from "native-base";
import { Button, Rating } from "react-native-elements";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";
import { API_URI } from "../../constants";

// create a component
export default class RateIndividualModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      token: null,
      evaluation: {},
      isLoading: false,
      callback: null
    };
  }

  componentDidMount() {
    this.setState({
      event: this.props.event,
      token: this.props.token,
      callback: this.props.callback
    });
  }
  //Helper methods
  evaluateAction = () => {
    this.setState({ isLoading: true });
    this.state.callback(this.state.evaluation);
    this.props.navigator.dismissAllModals({
      animationType: "slide-down"
    });
  };

  //UI
  rateIndividualsAction = async () => {};

  storeEvaluation = (rating, profileId) => {
    var evaluation = this.state.evaluation;
    evaluation[profileId] = rating;
    this.setState({
      evaluation: evaluation
    });
  };
  close() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  render() {
    const event = this.state.event;
    if (
      event != null &&
      JSON.stringify(event) != JSON.stringify({}) &&
      event.listStarters != null &&
      JSON.stringify(event.listStarters) != JSON.stringify({})
    ) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Evalua a cada jugador</Text>
            <View style={styles.close}>
              <TouchableOpacity onPress={() => this.close()}>
                <Image
                  style={styles.closeImage}
                  source={require("../../assets/images/exit.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.playerHolder}>
            <ScrollView style={styles.userList}>
              {this.state.event.listStarters.map((starter, i) => (
                <View style={styles.participant}>
                  <View style={styles.iconHolder}>
                    <Image
                      style={styles.participantIcon}
                      source={{
                        uri:
                          starter.profileParticipant.picturePath &&
                          starter.profileParticipant.picturePath != ""
                            ? starter.profileParticipant.picturePath
                            : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                      }}
                    />
                  </View>
                  <View style={styles.dataHolder}>
                    <Text style={styles.participantName}>
                      {starter.profileParticipant.account.username}
                    </Text>
                  </View>
                  <View style={styles.ratingHolder}>
                    <Rating
                      type="star"
                      ratingCount={5}
                      fractions={0}
                      startingValue={0}
                      imageSize={30}
                      onFinishRating={rating =>
                        this.storeEvaluation(rating, starter.standardProfileID)
                      }
                      showRating={false}
                      style={{ paddingVertical: 10 }}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.buttonHolder}>
            <Button
              title="Evaluar"
              onPress={this.evaluateAction}
              titleStyle={{ fontWeight: "700" }}
              loading={this.state.isLoading}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              buttonStyle={styles.buttonEv}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
