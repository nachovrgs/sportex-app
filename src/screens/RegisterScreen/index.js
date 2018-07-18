//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import { Input, Button } from "react-native-elements";
import { screens } from "../../screens";
import { logout } from "../../helpers/navigation";
import { API_URI } from "../../constants";
import styles from "./styles";

import { colors } from "../../styles";
// create a component
export default class RegisterScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarHidden: true,
    navBarBackgroundColor: colors.navbar,
    navBarComponentAlignment: "center"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      dateOfBirth: "",
      masculin: true,
      isLoading: false
    };
  }

  //Date
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      dateOfBirth: date
    });
    this._hideDateTimePicker();
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
      return month + "/" + day + "/" + year;
    }
  };

  isReady = () => {
    return (
      this.state.username &&
      this.state.password &&
      this.state.email &&
      this.state.firstname &&
      this.state.lastname &&
      this.state.dateOfBirth &&
      this.state.username != "" &&
      this.state.password != "" &&
      this.state.email != "" &&
      this.state.firstname != "" &&
      this.state.lastname != "" &&
      this.state.dateOfBirth != ""
    );
  };

  //Form methods
  onUsernameChanged = username => {
    this.setState({
      username: username
    });
  };
  onPasswordChanged = password => {
    this.setState({
      password: password
    });
  };
  onEmailChanged = email => {
    this.setState({
      email: email
    });
  };
  onFirstnameChanged = firstname => {
    this.setState({
      firstname: firstname
    });
  };
  onLastNameChanged = lastname => {
    this.setState({
      lastname: lastname
    });
  };

  registerAction = () => {
    this.setState({ isLoading: true });
    fetch(`${API_URI}/standardProfile/postapp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Account: {
          username: this.state.username,
          password: this.state.password,
          Token: ""
        },
        MailAddress: this.state.email,
        FirstName: this.state.firstname,
        LastName: this.state.lastname,
        PicturePath: "",
        DateOfBirth: this.cleanDate(this.state.dateOfBirth),
        Sex: this.state.masculin ? 1 : 0
      })
    })
      .then(response => {
        if (response.ok) {
          //User created, going to login
          this.props.navigator.push({
            screen: screens.login.id,
            title: screens.login.title,
            animated: true,
            animationType: "fade",
            backButtonHidden: screens.login.backButtonHidden
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
  };

  render() {
    return this.state.isError ? (
      <View style={styles.background}>
        <View behavior="padding" style={styles.container}>
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
        </View>
      </View>
    ) : (
      <View style={styles.background}>
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/companylogo.png")}
            />
            <Text style={styles.title}>Registrate para empezar a jugar</Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              placeholder="Usuario"
              shake={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.onUsernameChanged}
              inputContainerStyle={styles.loginInput}
            />
            <Input
              placeholder="Contraseña"
              shake={true}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.onPasswordChanged}
              inputContainerStyle={styles.loginInput}
            />
            <Input
              placeholder="Email"
              shake={true}
              onChangeText={this.onEmailChanged}
              autoCapitalize="none"
              inputContainerStyle={styles.loginInput}
            />
            <Input
              placeholder="Nombre"
              shake={true}
              onChangeText={this.onFirstnameChanged}
              inputContainerStyle={styles.loginInput}
            />
            <Input
              placeholder="Apellido"
              shake={true}
              onChangeText={this.onLastNameChanged}
              inputContainerStyle={styles.loginInput}
            />
            <View style={styles.dateInput}>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <Image
                  style={styles.calendarIcon}
                  source={require("../../assets/images/calendar.png")}
                />
                <Text style={styles.dateTimeText}>
                  {this.cleanDate(this.state.dateOfBirth)}
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                maximumDate={new Date()}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Siguiente"
              onPress={this.registerAction}
              disabled={!this.isReady()}
              loading={this.state.isLoading}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </View>
    );
  }
}
