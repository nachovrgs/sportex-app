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
import { Navigation } from "react-native-navigation";
import { startMainApp } from "../../App";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  CheckBox,
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

import { Button } from "react-native-elements";
import { logout } from "../../helpers/navigation";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class CreateEvent extends Component {
  static navigatorStyle = {
    navBarHidden: true,
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
      locations: [],
      selectedLocation: null,
      groups: [],
      selectedGroup: null,
      isPublic: false,
      maxStarters: 10,
      maxSubs: 10,
      token: "",
      profileId: null,
      isLoading: true,
      isError: false,
      fromGroup: false,
      error: ""
    };
    this.loadData();
  }
  componentDidMount() {
    this.setState({
      selectedGroup: this.props.groupId,
      fromGroup: this.props.fromGroup
    });
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
    this.setState({ isLoading: true });
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
        if (!this.state.isPublic && this.state.selectedGroup != null) {
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
          this.close();
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
  onValueChangePublic(value) {
    this.setState({
      isPublic: value
    });
  }
  onValueChangeStarters(value) {
    this.setState({
      maxStarters: value
    });
  }
  onValueChangeSubs(value) {
    this.setState({
      maxSubs: value
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

  close() {
    this.props.navigator.dismissModal({
      animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
    //Fix, remove this. This is bad.
    // React native navigation v1 removed support for the tab based modals.
    if (!this.state.fromGroup) {
      startMainApp();
    }
  }
  render() {
    const { name, description, isLoading, groups, locations } = this.state;
    return this.state.isError ? (
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
              <Title style={styles.pageTitle}>Nuevo partido</Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => this.close()}>
                <Image
                  style={styles.closeImage}
                  source={require("../../assets/images/exit.png")}
                />
              </TouchableOpacity>
            </Right>
          </Header>
          <Content>
            <ScrollView style={styles.form}>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Nombre</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="information" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <TextInput
                      style={styles.textContent}
                      onChangeText={value => this.setState({ name: value })}
                      value={this.state.name}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Descripcion</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="information" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <TextInput
                      style={styles.textContent}
                      onChangeText={value =>
                        this.setState({ description: value })
                      }
                      value={this.state.description}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Cuando?</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="calendar" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                      <Text style={styles.valueItem}>
                        {this.state.startingDate != null &&
                          new Date(
                            this.cleanDate(this.state.startingDate)
                          ).toDateString()}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      minimumDate={new Date()}
                      // maximumDate={new Date().setMonth((new Date().getMonth()+1))}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Hora?</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="clock" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <TouchableOpacity onPress={this._showTimePicker}>
                      <Text style={styles.valueItem}>
                        {this.state.startingTime != null &&
                          this.cleanTime(this.state.startingTime).split(
                            ":"
                          )[0] +
                            ":" +
                            this.cleanTime(this.state.startingTime).split(
                              ":"
                            )[1]}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isTimePickerVisible}
                      onConfirm={this._handleTimePicked}
                      onCancel={this._hideTimePicker}
                      mode="time"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Donde?</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="pin" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <Picker
                      mode="dropdown"
                      note={false}
                      style={{ width: 350 }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.selectedLocation}
                      onValueChange={this.onValueChangeLocations.bind(this)}
                    >
                      {this._renderLocationOptionItem(locations)}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Tipo</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="cog" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <Picker
                      mode="dropdown"
                      note={false}
                      style={{ width: 350 }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.isPublic}
                      onValueChange={this.onValueChangePublic.bind(this)}
                    >
                      <Picker.Item label="Publico" value={true} />
                      <Picker.Item label="Privado" value={false} />
                    </Picker>
                  </View>
                </View>
              </View>
              {!this.state.isPublic && (
                <View style={styles.inputHolder}>
                  <Text style={styles.label}>Grupo</Text>
                  <View style={styles.input}>
                    <View style={styles.iconHolder}>
                      <Icon active name="contacts" style={styles.icon} />
                    </View>
                    <View style={styles.content}>
                      <Picker
                        mode="dropdown"
                        note={false}
                        style={{ width: 350 }}
                        enabled={!this.state.isPublic}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selectedGroup}
                        onValueChange={this.onValueChangeGroups.bind(this)}
                      >
                        {this._renderGroupOptionItem(groups)}
                      </Picker>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Jugadores?</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="football" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <Picker
                      mode="dropdown"
                      note={false}
                      style={{ width: 350 }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.maxStarters}
                      onValueChange={this.onValueChangeStarters.bind(this)}
                    >
                      <Picker.Item label="2" value={2} />
                      <Picker.Item label="3" value={3} />
                      <Picker.Item label="4" value={4} />
                      <Picker.Item label="5" value={5} />
                      <Picker.Item label="6" value={6} />
                      <Picker.Item label="7" value={7} />
                      <Picker.Item label="8" value={8} />
                      <Picker.Item label="9" value={9} />
                      <Picker.Item label="10" value={10} />
                      <Picker.Item label="11" value={11} />
                      <Picker.Item label="12" value={12} />
                      <Picker.Item label="13" value={13} />
                      <Picker.Item label="14" value={14} />
                      <Picker.Item label="15" value={15} />
                      <Picker.Item label="16" value={16} />
                      <Picker.Item label="17" value={17} />
                      <Picker.Item label="18" value={18} />
                      <Picker.Item label="19" value={19} />
                      <Picker.Item label="20" value={20} />
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Suplentes?</Text>
                <View style={styles.input}>
                  <View style={styles.iconHolder}>
                    <Icon active name="football" style={styles.icon} />
                  </View>
                  <View style={styles.content}>
                    <Picker
                      mode="dropdown"
                      note={false}
                      style={{ width: 350 }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.maxSubs}
                      onValueChange={this.onValueChangeSubs.bind(this)}
                    >
                      <Picker.Item label="0" value={0} />
                      <Picker.Item label="1" value={1} />
                      <Picker.Item label="2" value={2} />
                      <Picker.Item label="3" value={3} />
                      <Picker.Item label="4" value={4} />
                      <Picker.Item label="5" value={5} />
                      <Picker.Item label="6" value={6} />
                      <Picker.Item label="7" value={7} />
                      <Picker.Item label="8" value={8} />
                      <Picker.Item label="9" value={9} />
                      <Picker.Item label="10" value={10} />
                      <Picker.Item label="11" value={11} />
                      <Picker.Item label="12" value={12} />
                      <Picker.Item label="13" value={13} />
                      <Picker.Item label="14" value={14} />
                      <Picker.Item label="15" value={15} />
                      <Picker.Item label="16" value={16} />
                      <Picker.Item label="17" value={17} />
                      <Picker.Item label="18" value={18} />
                      <Picker.Item label="19" value={19} />
                      <Picker.Item label="20" value={20} />
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.buttonHolder}>
                <Button
                  title="Crear"
                  onPress={this.createAction}
                  disabled={!this.isReady()}
                  loading={this.state.isLoading}
                  loadingProps={{
                    size: "large",
                    color: "rgba(111, 202, 186, 1)"
                  }}
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles.button}
                />
              </View>
            </ScrollView>
          </Content>
        </Container>
      </Root>
    );
  }
}
