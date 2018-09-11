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
import {
  getLanguage,
  getAlgorithm,
  setLanguage,
  setAlgorithm
} from "../../helpers/storage";
import { API_URI } from "../../constants";
import { screens } from "../../screens";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class Settings extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = { language: "es", algorithm: "0" };
    this.loadData();
  }
  componentDidMount() {}
  //Helper methods
  async loadData() {
    var lan = await getLanguage();
    var algo = await getAlgorithm();
    this.setState({
      language: lan,
      algorithm: algo
    });
  }

  onValueChangeLanguage(value) {
    this.setState({
      language: value
    });
    setLanguage(value);
  }
  onValueChangeAlgorithm(value) {
    this.setState({
      algorithm: value
    });
    setAlgorithm(value);
  }

  close() {
    this.props.navigator.dismissModal({
      animationType: "fade" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
    const { language, algorith } = this.state;
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
              <Title style={styles.pageTitle}>Configuracion</Title>
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
                <Text style={styles.label}>Lenguaje</Text>
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
                      selectedValue={this.state.language}
                      onValueChange={this.onValueChangeLanguage.bind(this)}
                    >
                      <Picker.Item label="Espanol" value={"es"} />
                      <Picker.Item label="Ingles" value={"en"} />
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>Algoritmo de Busqueda</Text>
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
                      selectedValue={this.state.algorithm}
                      onValueChange={this.onValueChangeAlgorithm.bind(this)}
                    >
                      <Picker.Item label="Normal" value={"0"} />
                      <Picker.Item label="Machine Learning" value={"1"} />
                    </Picker>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Content>
        </Container>
      </Root>
    );
  }
}
