//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import geolib from "geolib";
import PhotoUpload from "react-native-photo-upload";
import Autocomplete from "react-native-autocomplete-input";

import {
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Label,
  Root
} from "native-base";
import { Button } from "react-native-elements";
import { UserList } from "../../components";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import {
  getTokenForUsage,
  getAccountIdForUsage,
  getProfileIdForUsage
} from "../../helpers/storage";
import { logInfo, logError } from "../../helpers/logger";
import { colors } from "../../styles";

// create a component
export default class GroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      groupId: null,
      accountID: null,
      profileId: null,
      isLoading: true,
      isError: false,
      deleteDisabled: true,
      error: "",
      token: "",
      query: "",
      users: [],
      editing: false
    };
    this.loadData();
  }
  static navigatorButtons = {
    rightButtons: []
  };
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    tabBarHidden: true,
    navBarHidden: true
  };
  async loadData() {
    this.state.token = await getTokenForUsage();
  }
  componentDidMount() {
    this.setState({
      groupId: this.props.groupId
    });
    this.loadData();
  }

  //Helpers
  goToProfile(profile) {
    this.props.navigator.showModal({
      screen: screens.profileScreen.id,
      title: screens.profileScreen.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.profileScreen.backButtonHidden,
      passProps: {
        profileId: profile.standardProfileID
      }
    });
  }

  //API Functions
  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.accountID = await getAccountIdForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(`${API_URI}/group/${this.state.groupId}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : "")
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({
            isLoading: false,
            isError: true,
            error: "Network response was not ok.",
            token: ""
          });
          return new Error("Network response was not ok.");
        }
      })
      .then(jsonResponse => {
        this.setState({
          group: jsonResponse,
          isLoading: false,
          error: ""
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
          error: error.message,
          token: ""
        });
        throw error;
      });
  }

  removeMember(member) {
    this.toggleEditing();
    fetch(`${API_URI}/group/LeaveGroup/`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idProfile: member.standardProfileID,
        idGroup: this.state.groupId,
        listIdProfiles: []
      })
    })
      .then(response => {
        if (response.ok) {
          console.log("Network response was ok.");
          this.loadData();
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

  //UI Helpers
  close() {
    this.props.navigator.dismissAllModals({
      animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }
  addPlayersAction() {
    this.props.navigator.showModal({
      screen: screens.addMembersModal.id,
      title: screens.addMembersModal.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.addMembersModal.backButtonHidden,
      passProps: {
        groupId: this.state.groupId
      }
    });
  }
  render() {
    const { group } = this.state;
    if (JSON.stringify(group) != JSON.stringify({})) {
      let members = group.listMembers;
      return (
        <View style={styles.container}>
          {this.state.isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color={colors.black}
                animating={this.state.isLoading}
                hidesWhenStopped
              />
            </View>
          )}
          {!this.state.isLoading && (
            <View style={styles.container}>
              <View style={styles.head}>
                <View style={styles.imageContainer}>
                  <PhotoUpload
                    onPhotoSelect={avatar => {
                      if (avatar) {
                        //Send image to azure blob
                        console.log("Image base64 string: ", avatar);
                      }
                    }}
                  >
                    <Image
                      style={styles.avatar}
                      resizeMode="cover"
                      source={{
                        uri:
                          "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                      }}
                    />
                  </PhotoUpload>
                </View>
                <View style={styles.closeHolder}>
                  <TouchableOpacity onPress={() => this.close()}>
                    <Image
                      style={styles.closeImage}
                      source={require("../../assets/images/exit.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{group.groupName}</Text>
                </View>
              </View>
              <View style={styles.body}>
                <View style={styles.infoContainer}>
                  <Text style={styles.ownerDesc}>Creador: </Text>
                  <Text style={styles.owner}>
                    {group.creatorProfile.firstName}{" "}
                    {group.creatorProfile.lastName}
                  </Text>
                </View>
                <View style={styles.addPlayersHolder}>
                  <TouchableOpacity
                    style={styles.addPlayers}
                    onPress={() => this.addPlayersAction()}
                  >
                    <View style={styles.addPlayersImageHolder}>
                      <Image
                        style={styles.addPlayersImage}
                        source={require("../../assets/images/add.png")}
                      />
                    </View>
                    <View style={styles.addPlayersTextHolder}>
                      <Text style={styles.addPlayersText}>
                        Agregar usuarios
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.membersContainer}>
                  <View style={styles.membersHeader}>
                    <Text style={styles.membersTitle}>Miembros</Text>
                    <Text style={styles.membersTotal}>
                      {members.length} Jugadores
                    </Text>
                  </View>
                  <View style={styles.memberList}>
                    <UserList users={members} />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}
