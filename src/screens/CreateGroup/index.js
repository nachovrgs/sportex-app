//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView
} from "react-native";
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
  Icon,
  Picker
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
      error: ""
    };
    this.loadData();
  }

  //Helper methods
  async loadData() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
  }

  findLocation = query => {
    if (!query || query === "") {
      return [];
    }
    const { locations } = this.state.locations;
    const regex = new RegExp(`${query.trim()}`, "i");
    return locations.filter(location => location.Name.search(regex) >= 0);
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

  isReady = () => {
    return (
      this.state.name &&
      this.state.description &&
      this.state.name != "" &&
      this.state.description != ""
    );
  };

  createAction = () => {
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
          console.log("Network response was ok.");
          //Event created,oing to feed
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
  };

  render() {
    const { name, description, isLoading } = this.state;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Nuevo grupo</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
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
          </Form>
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
        </Content>
      </Container>
    );
  }
}
