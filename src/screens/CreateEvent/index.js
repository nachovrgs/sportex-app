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
  Icon
} from "native-base";
import { logout } from "../../helpers/navigation";
import { getTokenForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class CreateEvent_1 extends Component {
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
      startingDate: null,
      startingTime: null,
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      query: "",
      locations: [
        {
          ID: 1,
          Name: "Scuola",
          CreatedOn: "2018-06-04 00:00:00",
          Description: "Carrasco - Scuola",
          LastUpdate: "2018-06-04 00:00:00",
          Status: 1
        }
      ],
      isPublic: false,
      maxStarters: 15,
      maxSubs: 5,
      token: "",
      isLoading: true,
      isError: false,
      error: ""
    };
    this.loadData();
  }

  //Helper methods
  async loadData() {
    this.state.token = await getTokenForUsage();
    await loadGroups();
  }
  async loadGroups() {
    fetch(`${API_URI}/group`, {
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
          this.state.isLoading = false;
          this.state.isError = true;
          this.state.error = "Network response was not ok.";
          this.state.token = "";
          return new Error("Network response was not ok.");
        }
      })
      .then(jsonResponse => {
        this.state.token = jsonResponse;
      })
      .catch(error => {
        this.state.isLoading = false;
        this.state.isError = true;
        this.state.error = error.message;
        this.state.token = "";
        throw error;
      });
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

  cleanDate = date => {
    if (date) {
      var day =
        String(date.getDate()).length == 1
          ? "0" + date.getDate()
          : date.getDate();
      var month =
        String(date.getMonth()).length == 1
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      return year + "-" + month + "-" + day;
    }
  };

  cleanTime = time => {
    if (time) {
      var hour =
        String(time.getHours()).length == 1
          ? "0" + time.getHours()
          : time.getHours();
      var minute =
        String(time.getMinutes()).length == 1
          ? "0" + time.getMinutes()
          : time.getMinutes();
      var second =
        String(time.getSeconds()).length == 1
          ? "0" + time.getSeconds()
          : time.getSeconds();
      return hour + ":" + minute + ":" + second;
    }
  };
  isReady = () => {
    return (
      this.state.name &&
      this.state.description &&
      this.state.name != "" &&
      this.state.description != "" &&
      this.state.startingDate &&
      this.state.startingTime &&
      this.state.startingDate != "" &&
      this.state.startingTime != ""
    );
  };

  //Date
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log(date);
    this.setState({
      startingDate: date,
      startingTime: this.state.startingTime
    });
    this._hideDateTimePicker();
  };
  //Time
  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = time => {
    this.setState({
      startingDate: this.state.startingDate,
      startingTime: time
    });
    this._hideTimePicker();
  };
  cleanDate = date => {
    if (date) {
      var day =
        String(date.getDate()).length == 1
          ? "0" + date.getDate()
          : date.getDate();
      var month =
        String(date.getMonth()).length == 1
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      return year + "-" + month + "-" + day;
    }
  };

  cleanTime = time => {
    if (time) {
      var hour =
        String(time.getHours()).length == 1
          ? "0" + time.getHours()
          : time.getHours();
      var minute =
        String(time.getMinutes()).length == 1
          ? "0" + time.getMinutes()
          : time.getMinutes();
      var second =
        String(time.getSeconds()).length == 1
          ? "0" + time.getSeconds()
          : time.getSeconds();
      return hour + ":" + minute + ":" + second;
    }
  };
  createAction = () => {
    fetch(`${API_URI}/event`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StandardProfileID: 1,
        EventName: this.state.name,
        Description: this.state.description,
        EventType: 1,
        StartingTime:
          this.cleanDate(this.state.startingDate) +
          "T" +
          this.cleanTime(this.state.startingTime),
        LocationID: 1,
        IsPublic: this.state.isPublic ? 1 : 0,
        MaxStarters: this.state.maxStarters,
        MasSubs: this.state.maxSubs
      })
    })
      .then(response => {
        if (response.ok) {
          console.log("Network response was ok.");
          //Event created,oing to feed
          this.props.navigator.push({
            screen: screens.eventFeed.id,
            title: screens.eventFeed.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.eventFeed.backButtonHidden
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
            <Title>Nuevo partido</Title>
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
            <Item>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <Icon active name="calendar" />
              </TouchableOpacity>
              <Input
                editable={false}
                placeholder="Fecha"
                value={this.cleanDate(this.state.startingDate)}
              />
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                minimumDate={new Date()}
                // maximumDate={new Date().setMonth((new Date().getMonth()+1))}
              />
            </Item>
            <Item>
              <TouchableOpacity onPress={this._showTimePicker}>
                <Icon active name="clock" />
              </TouchableOpacity>
              <Input
                editable={false}
                placeholder="Hora"
                value={this.cleanDate(this.state.startingTime)}
              />
              <DateTimePicker
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this._handleTimePicked}
                onCancel={this._hideTimePicker}
                minimumDate={new Date()}
                mode="time"
              />
            </Item>
            <Item last>
              <CheckBox
                checked={this.state.isPublic}
                onPress={() =>
                  this.setState({ isPublic: !this.state.isPublic })
                }
              />
              <Body>
                <Text>Publico</Text>
              </Body>
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
