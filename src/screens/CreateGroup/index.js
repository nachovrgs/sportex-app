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
import Autocomplete from "react-native-autocomplete-input";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  CheckBox,
  Button,
  Label,
  Left,
  Body,
  Right,
  Title,
  DatePicker,
  Thumbnail,
  Icon,
  Picker,
  Root,
  List,
  ListItem
} from "native-base";
import { logout } from "../../helpers/navigation";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class CreateGroup extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      query: "",
      token: "",
      profileId: null,
      isLoading: true,
      isError: false,
      error: "",
      users: [],
      query: "",
      selectedUsers: []
    };
    this.loadData();
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
  renderUser(user) {
    const { mailAddress } = user;

    return (
      <View>
        <Text style={styles.titleText}>{mailAddress}</Text>
      </View>
    );
  }
  findLocation = query => {
    if (!query || query === "") {
      return [];
    }
    const { users } = this.state.users;
    const regex = new RegExp(`${query.trim()}`, "i");
    return users.filter(user => user.Name.search(regex) >= 0);
  };

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

  insertUser(user) {
    this.state.selectedUsers.push(user);
    this.setState({
      selectedUsers: this.state.selectedUsers,
      query: ""
    });
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
          !this.state.selectedUsers.includes(user) &&
          user.id != this.state.profileId
      )
      .filter(user => user.mailAddress.search(regex) >= 0)
      .slice(0, 5);
  }

  isReady = () => {
    return (
      this.state.name &&
      this.state.description &&
      this.state.name != "" &&
      this.state.description != ""
    );
  };

  createAction = () => {
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
      .then(textResponse => {
        if (this.state.selectedUsers.length > 0) {
          console.log(
            JSON.stringify("LA API DEVOLVIO: " + JSON.stringify(textResponse))
          );
          this.invitarMiembros(JSON.stringify(textResponse));
        } else {
          console.log("Network response was ok.");
          //Event created going to feed
          this.props.navigator.push({
            screen: screens.groups.id,
            title: screens.groups.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.groups.backButtonHidden
          });
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
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
  };
  invitarMiembros(groupId) {
    console.log("se invita gente!");
    console.log(
      JSON.stringify(this.state.selectedUsers.map((member, i) => member.id))
    );
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
        listIdProfiles: this.state.selectedUsers.map((member, i) => member.id)
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
  render() {
    const { name, description, isLoading, query } = this.state;
    const users = this.findUser(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return this.state.isLoading ? (
      <Root>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ecf0f1" animating />
        </View>
      </Root>
    ) : this.state.isError ? (
      <Root>
        <View style={styles.noEventsContainer}>
          <View style={styles.noEventsSubContainer}>
            <Image
              style={styles.noEventsImage}
              source={require("../../assets/images/no_internet.png")}
            />
            <Text style={styles.noEventsText}>
              No tienes conexion a internet.
            </Text>
          </View>
        </View>
      </Root>
    ) : (
      <Root>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Nuevo grupo</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Form style={styles.groupForm}>
              <Item fixedLabel>
                <Label>Nombre</Label>
                <Input
                  returnKeyType="next"
                  value={name}
                  onChangeText={this.onNameChanged}
                  autoCorrect={true}
                />
              </Item>
              <Item fixedLabel>
                <Label>Descripción</Label>
                <Input
                  value={description}
                  autoCorrect={true}
                  onChangeText={this.onDescriptionChanged}
                  ref={input => (this.descriptionInput = input)}
                />
              </Item>
              <Item>
                <ScrollView style={styles.userList}>
                  <List>
                    {this.state.selectedUsers.length == 0 && (
                      <View style={styles.noUsers}>
                        <Text>Agrega usuarios!</Text>
                      </View>
                    )}
                    {this.state.selectedUsers.length > 0 &&
                      this.state.selectedUsers.map((member, i) => (
                        <ListItem avatar>
                          <Left>
                            <Thumbnail
                              style={styles.participantIcon}
                              source={{
                                uri:
                                  member.picturePath && member.picturePath != ""
                                    ? member.picturePath
                                    : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                              }}
                            />
                          </Left>
                          <Body>
                            <Text style={styles.participantName}>
                              {member.account.username}
                            </Text>
                          </Body>
                        </ListItem>
                      ))}
                  </List>
                </ScrollView>
              </Item>
              <Item>
                <TouchableOpacity onPress={() => this.insertUser(users[0])}>
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
              </Item>
              <Item>
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
              </Item>
            </Form>
          </Content>
          <View style={styles.createButton}>
            <Button
              block
              success
              onPress={this.createAction}
              disabled={!this.isReady()}
            >
              <Text>Crear</Text>
            </Button>
          </View>
        </Container>
      </Root>
    );
  }
}
