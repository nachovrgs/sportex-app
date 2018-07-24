//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Navigation } from "react-native-navigation";

import { Root, List, ListItem, Thumbnail, Left, Body } from "native-base";
import { Button } from "react-native-elements";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class addPlayersModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      token: null,
      profileId: null,
      isLoading: true,
      isError: false,
      error: "",
      users: [],
      filteredUsers: [],
      selectedUsers: [],
      eventId: 0,
      addingMemberId: 0
    };
    this.loadData();
  }
  componentDidMount() {
    this.setState({
      eventId: this.props.eventId
    });
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
          users: jsonResponse.slice(0, 30),
          filteredUsers: jsonResponse
            .slice(0, 30)
            .filter(
              user =>
                !this.state.selectedUsers.includes(user) &&
                user.id != this.state.profileId
            ),
          isLoading: false,
          error: ""
        });
        if (this.state.initial) {
          this.setState({ initial: false });
          this._refreshListView();
        }
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
  addAction = () => {
    if (this.state.selectedUsers.length > 0) {
      this.props.navigator.showModal({
        screen: screens.addPlayersConfirmModal.id,
        title: screens.addPlayersConfirmModal.title,
        animated: true,
        animationType: "fade",
        backButtonHidden: screens.addPlayersConfirmModal.backButtonHidden,
        passProps: {
          playerList: this.state.selectedUsers
        }
      });
    }
  };

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
  close() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }

  getButtonTitle = () => {
    const invited = this.state.selectedUsers.length;
    if (invited > 0) {
      return "Invitar " + this.state.selectedUsers.length + " usuarios";
    } else {
      return "Agregar usuarios";
    }
  };

  render() {
    const { query } = this.state;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Root>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Agrega jugadores</Text>
            <Text style={styles.subtitle}>
              Invita a tus amigos, buscalos por nombre de usuario!
            </Text>
            <View style={styles.close}>
              <TouchableOpacity onPress={() => this.close()}>
                <Image
                  style={styles.closeImage}
                  source={require("../../assets/images/exit.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
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
          <View style={styles.buttonHolder}>
            <Button
              title={this.getButtonTitle()}
              onPress={this.addAction}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </Root>
    );
  }
}
