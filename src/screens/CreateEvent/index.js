//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator
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
  Picker,
  Root
} from "native-base";
import { logout } from "../../helpers/navigation";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class CreateEvent extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center",
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
      locations: [],
      selectedLocation: null,
      groups: [],
      selectedGroup: null,
      isPublic: false,
      maxStarters: 15,
      maxSubs: 5,
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
    await this.loadGroups();
    await this.loadLocations();
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
          groups: jsonResponse,
          isLoading: false
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
  async loadLocations() {
    fetch(`${API_URI}/Location/`, {
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
          locations: jsonResponse,
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
        StandardProfileID: this.state.profileId,
        EventName: this.state.name,
        Description: this.state.description,
        EventType: 1,
        StartingTime:
          this.cleanDate(this.state.startingDate) +
          "T" +
          this.cleanTime(this.state.startingTime),
        LocationID: this.state.selectedLocation,
        IsPublic: this.state.isPublic,
        MaxStarters: this.state.maxStarters,
        MaxSubs: this.state.maxSubs
      })
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
      .then(textResponse => {
        if (!this.state.isPublic) {
          this.inviteGroupAction(JSON.stringify(textResponse));
        } else {
          //Event created, invitations not sent, going to feed
          this.props.navigator.push({
            screen: screens.eventFeed.id,
            title: screens.eventFeed.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.eventFeed.backButtonHidden
          });
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
  inviteGroupAction = eventId => {
    
    fetch(`${API_URI}/eventInvitation/InviteWholeGroup`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idProfileReceived: this.state.profileId,
        idProfileSent: this.state.profileId,
        idEvent: eventId,
        idGroup: this.state.selectedGroup
      })
    })
      .then(response => {
        if (response.ok) {
          //Event created, invitations not sent, going to feed
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
  onValueChangeGroups(value) {
    this.setState({
      selectedGroup: value
    });
  }
  onValueChangeLocations(value) {
    this.setState({
      selectedLocation: value
    });
  }
  _renderGroupOptionItem = list => {
    d = list.map((data, i) => {
      return <Picker.Item label={data.groupName} value={data.id} />;
    });
    // i did this because no need in ios :P
    if (Platform.OS === "android") {
      d.unshift(<Picker.Item label="Select" />);
    }
    return d;
    //and that's how you are ready to go, because this issue isn't fixed yet (checked on 28-Dec-2017)
  };
  _renderLocationOptionItem = list => {
    d = list.map((data, i) => {
      return <Picker.Item label={data.name} value={data.id} />;
    });
    // i did this because no need in ios :P
    if (Platform.OS === "android") {
      d.unshift(<Picker.Item label="Select" />);
    }
    return d;
    //and that's how you are ready to go, because this issue isn't fixed yet (checked on 28-Dec-2017)
  };
  render() {
    const { name, description, isLoading, groups, locations } = this.state;
    return this.state.isLoading ? (
      <Root>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ecf0f1" animating />
        </View>
      </Root>
    ) : this.state.isError ? (
      <Root>
        <View style={styles.container}>
          <Text>{this.state.error}</Text>
        </View>
      </Root>
    ) : (
      <Root>
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
                  value={this.cleanTime(this.state.startingTime)}
                />
                <DateTimePicker
                  isVisible={this.state.isTimePickerVisible}
                  onConfirm={this._handleTimePicked}
                  onCancel={this._hideTimePicker}
                  minimumDate={new Date()}
                  mode="time"
                />
              </Item>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Grupo"
                  enabled={!this.state.isPublic}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selectedGroup}
                  onValueChange={this.onValueChangeGroups.bind(this)}
                >
                  {this._renderGroupOptionItem(groups)}
                </Picker>
              </Item>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Lugar"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selectedLocation}
                  onValueChange={this.onValueChangeLocations.bind(this)}
                >
                  {this._renderLocationOptionItem(locations)}
                </Picker>
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
      </Root>
    );
  }
}
