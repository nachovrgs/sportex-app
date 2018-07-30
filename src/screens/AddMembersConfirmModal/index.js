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

import { Root, List, ListItem, Thumbnail, Left, Body } from "native-base";
import { Navigation } from "react-native-navigation";
import { Button } from "react-native-elements";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";

// create a component
export default class addMembersConfirmModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = { playerList: [], onClose: null };
    this.inviteMember = this.inviteMember.bind(this);
    this.addAction = this.addAction.bind(this);
    this.loadData();
  }

  componentDidMount() {
    this.setState({
      playerList: this.props.playerList,
      groupId: this.props.groupId
    });
  }

  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
  }

  //Helper methods
  inviteMember = memberId => {
    if (memberId != null) {
      fetch(`${API_URI}/group/JoinGroup/`, {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            (this.state.token ? this.state.token.replace(/"/g, "") : ""),
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          idProfile: memberId,
          idGroup: this.state.groupId,
          listIdProfiles: []
        })
      })
        .then(response => {
          if (response.ok) {
            console.log("Miembro invitado : " + memberId);
          } else {
            console.log("Network response was not ok.");
            this.setState({
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
            isError: true,
            error: error.message,
            token: ""
          });
          throw error;
        });
    }
  };
  addAction = async () => {
    const playerList = this.state.playerList;
    this.setState({ isLoading: true });
    playerList.forEach(async element => {
      await this.inviteMember(element.member.id);
    });

    this.setState({
      isLoading: false
    });
    this.props.navigator.dismissAllModals({
      animationType: "slide-down"
    });
  };
  closeModal = () => {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.close}>
          <TouchableOpacity onPress={() => this.closeModal()}>
            <Image
              style={styles.closeImage}
              source={require("../../assets/images/exit.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Agregar estos jugadores?</Text>
        </View>
        <View style={styles.playerHolder}>
          <ScrollView style={styles.userList}>
            {this.state.playerList.map((member, i) => (
              <View style={styles.participant}>
                <View style={styles.iconHolder}>
                  <Image
                    style={styles.participantIcon}
                    source={{
                      uri:
                        member.member.picturePath &&
                        member.member.picturePath != ""
                          ? member.member.picturePath
                          : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                    }}
                  />
                </View>
                <View style={styles.dataHolder}>
                  <Text style={styles.participantName}>
                    {member.member.account.username}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttonHolder}>
          <Button
            title="Confirmar"
            onPress={this.addAction}
            loading={this.state.isLoading}
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }
}
