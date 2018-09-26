//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import { screens } from "../../screens";
import PhotoUpload from "react-native-photo-upload";

import { Divider, Rating } from "react-native-elements";
import { Thumbnail } from "native-base";
import {
  getTokenForUsage,
  getAccountIdForUsage,
  getProfileIdForUsage,
  resetAndLogout
} from "../../helpers/storage";
import { API_URI } from "../../constants";
import I18n from "../../i18n";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class UserProfile extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarButtonColor: colors.text_orange,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require("../../assets/images/logout.png"),
        id: "logout",
        buttonColor: "#ecf0f1",
        buttonFontSize: 50,
        buttonFontWeight: "900"
      }
    ],
    rightButtons: [
      {
        icon: require("../../assets/images/cog.png"),
        id: "settings",
        buttonColor: "#ecf0f1",
        buttonFontSize: 50,
        buttonFontWeight: "900"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      isLoading: true,
      isError: false,
      error: "",
      token: "",
      accountID: "",
      profileId: "",
      groups: []
    };
    this.loadStorageItems();
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case "willAppear":
        break;
      case "didAppear":
        break;
      case "willDisappear":
        break;
      case "didDisappear":
        break;
      case "willCommitPreview":
        break;
    }
    if (event.type == "NavBarButtonPress") {
      if (event.id == "logout") {
        resetAndLogout();
      } else if (event.id == "settings") {
        this.props.navigator.showModal({
          screen: screens.settings.id,
          title: screens.settings.title,
          animated: true,
          animationType: "fade",
          backButtonHidden: screens.settings.backButtonHidden
        });
      }
    }
  }

  async loadStorageItems() {
    this.state.token = await getTokenForUsage();
    this.state.accountID = await getAccountIdForUsage();
    this.state.profileId = await getProfileIdForUsage();
    this.loadData();
    this.loadGroups();
  }
  async loadData() {
    fetch(`${API_URI}/standardProfile/account/${this.state.accountID}`, {
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
          profile: jsonResponse,
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

  async loadGroups() {
    fetch(`${API_URI}/group/Joined/${this.state.profileId}`, {
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
          Toast.show({
            text: "Imposible conectarse al servidor. Tienes internet?",
            buttonText: "Ok"
          });
        }
      })
      .then(jsonResponse => {
        if (jsonResponse.length == 0 && !this.state.noEventsShowed) {
          Toast.show({
            text: "No hay grupos! Crea uno.",
            buttonText: "Ok",
            onClose: this.toggleNoEventsShowed
          });
        }
        this.setState({
          groups: jsonResponse
        });
      })
      .catch(error => {
        Toast.show({
          text: "Ocurrio un error!",
          buttonText: "Ok"
        });
      });
  }

  uploadImage = image => {
    fetch(`${API_URI}/standardProfile/updateImage/${this.state.profileId}`, {
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

  handleGroupPress(groupId) {
    this.props.navigator.showModal({
      screen: screens.groupScreen.id,
      title: screens.groupScreen.title,
      animated: true,
      animationType: "fade",
      backButtonHidden: screens.groupScreen.backButtonHidden,
      passProps: {
        groupId: groupId
      }
    });
  }

  render() {
    const profile = this.state.profile;
    const groups = this.state.groups;
    if (
      JSON.stringify(profile) != JSON.stringify({}) &&
      JSON.stringify(groups) != JSON.stringify([])
    ) {
      return (
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
                      profile.picturePath != null && profile.picturePath != ""
                        ? profile.picturePath
                        : "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </PhotoUpload>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {profile.firstName} {profile.lastName}
              </Text>
              <Text style={styles.username}>{profile.account.username}</Text>
            </View>
          </View>
          <View style={styles.divider}>
            <Divider style={{ backgroundColor: colors.text_grey }} />
          </View>
          <View style={styles.rating}>
            <Text style={styles.sectionTitle}>Rating: </Text>
            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={5}
                fractions={0}
                startingValue={profile.averageRating}
                imageSize={30}
                readonly
                ratingColor={colors.text_orange}
                showRating={false}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <Text style={styles.ratingSubtitle}>
              {profile.countReviews} reviews
            </Text>
          </View>
          <View style={styles.divider}>
            <Divider style={{ backgroundColor: colors.text_grey }} />
          </View>
          <View style={styles.challenges}>
            <View style={styles.challengesTitleHolder}>
              <Text style={styles.sectionTitle}>Rivales:</Text>
            </View>
            <View style={styles.challengesContentHolder}>
              <View style={styles.groupHolder}>
                <Image
                  style={styles.groupItem}
                  source={{
                    uri:
                      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </View>
              <View style={styles.groupHolder}>
                <Image
                  style={styles.groupItem}
                  source={{
                    uri:
                      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </View>
              <View style={styles.groupHolder}>
                <Image
                  style={styles.groupItem}
                  source={{
                    uri:
                      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </View>
              <View style={styles.groupHolder}>
                <Image
                  style={styles.groupItem}
                  source={{
                    uri:
                      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </View>
              <View style={styles.groupHolder}>
                <Image
                  style={styles.groupItem}
                  source={{
                    uri:
                      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </View>
              <View style={styles.groupHolder}>
                <Image
                  style={styles.groupItem}
                  source={{
                    uri:
                      "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.divider}>
            <Divider style={{ backgroundColor: colors.text_grey }} />
          </View>
          <View style={styles.played}>
            <Text style={styles.sectionTitle}>Partidos jugados:</Text>
            <Text style={styles.playedSubtitle}>
              {profile.countReviews} partidos
            </Text>
          </View>
          <View style={styles.divider}>
            <Divider style={{ backgroundColor: colors.text_grey }} />
          </View>
          <View style={styles.sharedGroups}>
            <View style={styles.sharedGroupsTitleHolder}>
              <Text style={styles.sectionTitle}>Mis grupos:</Text>
            </View>
            <View style={styles.challengesContentHolder}>
              {groups.length > 0 &&
                groups.map((group, i) => (
                  <View style={styles.groupHolder}>
                    <TouchableOpacity
                      onPress={() => this.handleGroupPress(group.id)}
                    >
                      <Image
                        style={styles.groupItem}
                        source={{
                          uri:
                            group.picturePath && group.picturePath != ""
                              ? group.picturePath
                              : "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.background} animating />
        </View>
      );
    }
  }
}
