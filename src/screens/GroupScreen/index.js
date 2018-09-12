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

import I18n from "../../i18n";
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
import { colors, sizes } from "../../styles";

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
  async loadDataFromStorage() {
    this.state.token = await getTokenForUsage();
    this.state.accountID = await getAccountIdForUsage();
    this.state.profileId = await getProfileIdForUsage();
    this.loadData();
  }
  componentDidMount() {
    this.setState({
      groupId: this.props.groupId
    });
    this.loadDataFromStorage();
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
    this.setState({ isLoading: true });

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
  removeMember = memberId => {
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
        idProfile: memberId,
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
  };

  leaveGroup = () => {
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
        idProfile: this.state.profileId,
        idGroup: this.state.groupId,
        listIdProfiles: []
      })
    })
      .then(response => {
        if (response.ok) {
          this.props.navigator.dismissAllModals({
            animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
          });
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
  };
  createMatch = () => {
    this.props.navigator.showModal({
      screen: screens.createEvent.id,
      title: screens.createEvent.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.createEvent.backButtonHidden,
      passProps: {
        groupId: this.state.groupId,
        fromGroup: true
      }
    });
  };

  uploadImage = image => {
    fetch(`${API_URI}/group/updateImage/${this.state.groupId}`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(image)
    })
      .then(response => {
        if (response.ok) {
          //Image uploaded
          console.log("Uploaded images");
        } else {
          console.log(JSON.stringify(response));
          console.log("Network response was not ok.");
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };

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
                        this.uploadImage(avatar);
                      }
                    }}
                  >
                    <Image
                      style={styles.avatar}
                      resizeMode="cover"
                      source={{
                        uri:
                          group.picturePath != null && group.picturePath != ""
                            ? group.picturePath
                            : "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
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
                {this.state.group.creatorProfile.id == this.state.profileId && (
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
                )}
                <View style={styles.membersContainer}>
                  <View style={styles.membersHeader}>
                    <Text style={styles.membersTitle}>Miembros</Text>
                    <Text style={styles.membersTotal}>
                      {members.length} Jugadores
                    </Text>
                  </View>
                  <View style={styles.memberList}>
                    <UserList
                      users={members}
                      callback={memberId => this.removeMember(memberId)}
                      creatorId={this.state.group.creatorProfile.id}
                      isOwner={
                        this.state.group.creatorProfile.id ==
                        this.state.profileId
                      }
                    />
                  </View>
                </View>
                <View style={styles.buttonHolder}>
                  <View style={styles.leaveButton}>
                    <TouchableOpacity onPress={() => this.leaveGroup()}>
                      <Text style={styles.leaveText}>Salir</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.createButton}>
                    <Button
                      title="Crear Partido"
                      onPress={this.createMatch}
                      loading={this.state.isLoading}
                      loadingProps={{
                        size: "small",
                        color: "rgba(111, 202, 186, 1)"
                      }}
                      titleStyle={{ fontWeight: "200", fontSize: sizes.medium }}
                      buttonStyle={styles.button}
                    />
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
