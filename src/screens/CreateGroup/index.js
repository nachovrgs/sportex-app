//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  ScrollView
} from "react-native";
import { Button, Divider } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import Autocomplete from "react-native-autocomplete-input";
import DateTimePicker from "react-native-modal-datetime-picker";
import { logout } from "../../helpers/navigation";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import I18n from "../../i18n";
import { colors } from "../../styles";

// create a component
export default class CreateGroup extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    tabBarHidden: true
  };
  static navigatorButtons = {
    rightButtons: [
      {
        title: I18n.t("general_create"),
        id: "create",
        buttonColor: colors.text_orange,
        buttonFontSize: 20,
        buttonFontWeight: "600"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      query: "",
      token: null,
      profileId: null,
      isLoading: false,
      isError: false,
      error: "",
      users: [],
      filteredUsers: [],
      selectedUsers: [],
      addingMemberId: 0
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.loadData();
  }
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "create") {
        this.createAction();
      }
    }
  }
  //Helper methods
  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    fetch(`${API_URI}/standardProfile`, {
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
            isError: true,
            error: "Network response was not ok."
          });
          return new Error("Network response was not ok.");
        }
      })
      .then(jsonResponse => {
        this.setState({
          users: jsonResponse.slice(0, 30),
          filteredUsers: jsonResponse
            .slice(0, 30)
            .filter(
              user =>
                !this.state.selectedUsers.includes(user) &&
                user.id != this.state.profileId
            ),
          error: ""
        });
      })
      .catch(error => {
        this.setState({
          isError: true,
          error: error.message,
          token: ""
        });
        throw error;
      });
  }

  //UserAdd Helper functions
  findUser = query => {
    if (!this.selectedEveryUser()) {
      this.state.query = query;
      const { users } = this.state;

      if (query === "") {
        this.clearFilteredUsers();
      }

      const regex = new RegExp(`${query.trim()}`, "i");
      var filteredUsers = users
        .filter(
          user =>
            !this.state.selectedUsers.includes(user) &&
            user.id != this.state.profileId
        )
        .filter(user => user.mailAddress.search(regex) >= 0);
      this.setState({ filteredUsers: filteredUsers });
    }
  };

  addMember = member => {
    if (!this.state.selectedUsers.includes(member)) {
      this.setState({ addingMemberId: member.member.id });
      setTimeout(() => {
        this.state.selectedUsers.push(member);
        this.clearFilteredUsers();
      }, 400);
    }
  };

  clearFilteredUsers = () => {
    const { users, selectedUsers } = this.state;

    var filteredUsersTreating = users.filter(
      user =>
        !this.includesMember(user, selectedUsers) &&
        user.id != this.state.profileId
    );
    if (this.state.filteredUsers.length == 1) {
      this.setState({
        filteredUsers: filteredUsersTreating,
        query: "",
        addingMemberId: 0
      });
    } else {
      this.setState({
        filteredUsers: filteredUsersTreating,
        addingMemberId: 0
      });
    }
  };

  includesMember = (member, list) => {
    for (var i = 0; i < list.length; i++) {
      if (list[i].member.id == member.id) {
        return true;
      }
    }
  };

  selectedEveryUser = () => {
    return this.state.users.length == this.state.selectedUsers.length + 1;
  };

  //END user add helper ACTIONS

  //SERVER ACTIONS
  createAction = () => {
    this.setState({ isLoading: true });
    const memberList = this.state.selectedUsers;
    fetch(`${API_URI}/group`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StandardProfileID: this.state.profileId,
        GroupName: this.state.name,
        GroupDescription: this.state.description,
        PicturePath: "",
        ListMembers: [
          {
            StandardProfileID: this.state.profileId,
            Type: 0
          }
        ],
        MemberCount: 1
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
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
      .then(textResponse => {
        if (this.state.selectedUsers.length > 0) {
          this.invitarMiembros(JSON.stringify(textResponse));
        } else {
          console.log("Network response was ok.");
          //Event created going to feed
          this.props.navigator.popToRoot({
            animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: "fade" // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
          });
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

  invitarMiembros(groupId) {
    fetch(`${API_URI}/group/InsertManyMembers/`, {
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
        idGroup: groupId,
        listIdProfiles: this.state.selectedUsers.map(
          (member, i) => member.member.id
        )
      })
    })
      .then(response => {
        if (response.ok) {
          console.log("Network response was ok.");
          //Event created going to feed
          this.props.navigator.popToRoot({
            animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: "fade" // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
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
  }

  //UI ACTIONS
  onNameChanged = name => {
    this.setState({
      name: name
    });
  };
  onDescriptionChanged = description => {
    this.setState({
      description: description
    });
  };
  getButtonTitle = () => {
    const invited = this.state.selectedUsers.length;
    if (invited > 0) {
      return (
        I18n.t("create_group_inv_1") +
        this.state.selectedUsers.length +
        I18n.t("create_group_inv_2")
      );
    } else {
      return I18n.t("create_group_add_users");
    }
  };
  render() {
    const { name, query } = this.state;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return this.state.isLoading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.background} animating />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.headHolder}>
          <View style={styles.imageHolder}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  //Send image to azure blob
                  console.log("Image base64 string: ", avatar);
                }
              }}
            >
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                  uri:
                    "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                }}
              />
            </PhotoUpload>
          </View>
          <View style={styles.nameHolder}>
            <Text style={styles.name}>{I18n.t("form_name")}</Text>
            <TextInput
              style={styles.nameInput}
              onChangeText={text => this.onNameChanged(text)}
              autoCorrect={false}
              value={name}
            />
          </View>
        </View>
        <View style={styles.divider}>
          <Divider style={{ backgroundColor: colors.text_grey }} />
        </View>
        <View style={styles.inviteHolder}>
          <Text style={styles.inviteTitle}>{this.getButtonTitle()}</Text>
          <View style={styles.playerSearchHolder}>
            <TextInput
              style={styles.search}
              onChangeText={text => this.findUser(text)}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.query}
            />
          </View>
          <View style={styles.playersHolder}>
            <ScrollView style={styles.userList}>
              {this.state.filteredUsers.length == 0 &&
                this.state.query.length == 0 &&
                !this.selectedEveryUser() && (
                  <View style={styles.noUsers}>
                    <ActivityIndicator
                      size="large"
                      color={colors.background}
                      animating
                    />
                  </View>
                )}
              {((this.state.filteredUsers.length == 0 &&
                this.state.query.length != 0) ||
                this.selectedEveryUser()) && (
                <View style={styles.noUsers}>
                  <Text>El usuario no existe</Text>
                </View>
              )}
              {this.state.filteredUsers.length > 0 &&
                this.state.filteredUsers.map((member, i) => (
                  <View style={styles.participant}>
                    <View style={styles.iconHolder}>
                      <Image
                        style={styles.participantIcon}
                        source={{
                          uri:
                            member.picturePath && member.picturePath != ""
                              ? member.picturePath
                              : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                        }}
                      />
                    </View>
                    <View style={styles.dataHolder}>
                      <Text style={styles.participantName}>
                        {member.account.username}
                      </Text>
                    </View>
                    <View style={styles.selectorHolder}>
                      {this.state.addingMemberId == member.id && (
                        <Image
                          style={styles.selector}
                          source={require("../../assets/images/ok.png")}
                        />
                      )}
                      {this.state.addingMemberId != member.id && (
                        <TouchableOpacity
                          onPress={() => this.addMember({ member })}
                        >
                          <Image
                            style={styles.selector}
                            source={require("../../assets/images/add.png")}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
