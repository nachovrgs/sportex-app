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
import { Button } from "react-native-elements";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class addPlayersSelectionModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = { linkButtonText: "Copiar Link", eventId: 0 };
  }

  componentDidMount() {
    this.setState({
      eventId: this.props.eventId
    });
  }
  //Helper methods
  addAction = () => {
    this.props.navigator.showModal({
      screen: screens.addPlayersModal.id,
      title: screens.addPlayersModal.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.addPlayersModal.backButtonHidden,
      passProps: {
        eventId: this.state.eventId
      }
    });
  };

  linkAction = async () => {
    await Clipboard.setString("hello world");
    this.setState({
      linkButtonText: "Copiado!"
    });
    setTimeout(() => {
      this.setState({ linkButtonText: "Copiar Link" });
    }, 1000);
  };

  close() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  render() {
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
          <Text style={styles.title}>Buscando jugadores?</Text>
          <Text style={styles.subtitle}>
            Invita a tus amigos, juega al futbol
          </Text>
        </View>
        <View style={styles.buttonHolder}>
          <Button
            title={this.state.linkButtonText}
            onPress={this.linkAction}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.buttonLink}
          />
          <Button
            title="Invitar Amigos"
            onPress={this.addAction}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.buttonAdd}
          />
        </View>
      </View>
    );
  }
}
