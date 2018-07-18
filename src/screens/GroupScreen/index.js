//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from "react-native";
import geolib from "geolib";
import Autocomplete from "react-native-autocomplete-input";
import { List, ListItem, Left, Thumbnail, Body, Label } from "native-base";
import { Avatar } from "react-native-elements";
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
      isLoading: false,
      isError: false,
      deleteDisabled: true,
      error: "",
      token: "",
      query: "",
      users: []
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.loadData();
  }
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../../assets/images/trash.png"),
        id: "delete",
        buttonColor: "#ecf0f1",
        buttonFontSize: 20,
        buttonFontWeight: "600",
        disabled: this.state ? this.state.deleteDisabled : true
      }
    ]
  };
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center"
  };
  async loadData() {
    this.state.token = await getTokenForUsage();
  }
  componentDidMount() {
    this._mounted = true;
    this.setState({
      groupId: this.props.groupId
    });
    this.loadData();
  }

  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "delete") {
        fetch(`${API_URI}/group/${this.state.groupId}`, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer " +
              (this.state.token ? this.state.token.replace(/"/g, "") : "")
          }
        })
          .then(response => {
            if (response.ok) {
              //Event deleted, going to feed
              this.props.navigator.push({
                screen: screens.groups.id,
                title: screens.groups.title,
                animated: true,
                animationType: "fade",
                backButtonHidden: screens.groups.backButtonHidden
              });
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
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  //Helpers
  isDeleteDisabled = () => {
    return this.state
      ? this.state.deleteDisabled
        ? this.state.deleteDisabled
        : true
      : true;
  };

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
        this.state.deleteDisabled =
          this.state.profileId == this.state.group.standardProfileID;
        this.loadUsers();
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
  async loadUsers() {
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
          users: jsonResponse,
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
  goToProfile(profile) {
    this.props.navigator.push({
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

  inviteMember(memberId) {
    fetch(`${API_URI}/group/JoinGroup/`, {
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
          //Event created going to feed
          this.props.navigator.push({
            screen: screens.groups.id,
            title: screens.groups.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.groups.backButtonHidden
          });
        } else {
          console.log("Network response was not ok.");
          this.setState({
            isLoading: false,
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
          isLoading: false,
          isError: true,
          error: error.message,
          token: ""
        });
        throw error;
      });
  }

  renderUser(user) {
    const { mailAddress } = user;

    return (
      <View>
        <Text style={styles.titleText}>{mailAddress}</Text>
      </View>
    );
  }

  findUser(query) {
    if (query === "") {
      return [];
    }

    const { users } = this.state;
    const regex = new RegExp(`${query.trim()}`, "i");
    return users
      .filter(
        user =>
          !this.state.group.listMembers.includes(user) &&
          user.id != this.state.profileId
      )
      .filter(user => user.mailAddress.search(regex) >= 0)
      .slice(0, 5);
  }
  render() {
    const { group, query } = this.state;
    const users = this.findUser(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    if (JSON.stringify(group) != JSON.stringify({})) {
      let members = group.listMembers;
      return (
        <View style={styles.background}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.imageContainer}>
                <Avatar
                  large
                  containerStyle={styles.avatar}
                  rounded
                  source={{
                    uri: group.picturePath
                      ? group.picturePath
                      : "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                  }}
                  activeOpacity={0.7}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{group.groupName}</Text>
                <Text style={styles.description}>{group.groupDescription}</Text>
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
              <View style={styles.membersContainer}>
                <Text>Members</Text>
                <ScrollView>
                  <List>
                    {members.map((participant, i) => (
                      <ListItem avatar>
                        <TouchableOpacity
                          onPress={() => this.goToProfile(participant)}
                        >
                          <Left>
                            <Thumbnail
                              style={styles.participantIcon}
                              source={{
                                uri:
                                  participant.profileMember.picturePath &&
                                  participant.profileMember.picturePath != ""
                                    ? participant.profileMember.picturePath
                                    : "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                              }}
                            />
                          </Left>
                        </TouchableOpacity>
                        <Body>
                          <Text style={styles.participantName}>
                            {participant.profileMember.account.username}
                          </Text>
                        </Body>
                      </ListItem>
                    ))}
                  </List>
                </ScrollView>
              </View>
              <View style={styles.addMemberContainer}>
                <TouchableOpacity onPress={() => this.inviteMember(users[0].id)}>
                  <Label>Agregar integrante : </Label>
                  <View style={styles.descriptionContainer}>
                    {users.length > 0 ? (
                      this.renderUser(users[0])
                    ) : (
                      <Text style={styles.infoText}>
                        Ingresar el nombre del usuario
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.autocompleteContainer}
                  data={
                    users.length === 1 && comp(query, users[0].mailAddress)
                      ? []
                      : users
                  }
                  defaultValue={query}
                  onChangeText={text => this.setState({ query: text })}
                  placeholder="Agrega integrantes"
                  listContainerStyle={styles.queryResultContainer}
                  listStyle={styles.queryResultItem}
                  renderItem={({ mailAddress }) => (
                    <TouchableOpacity
                      onPress={() => this.setState({ query: mailAddress })}
                    >
                      <Text style={styles.itemText}>{mailAddress}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
