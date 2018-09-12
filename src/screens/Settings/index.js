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
import I18n from "../../i18n";
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
import { getLanguages } from "react-native-i18n";

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
              <Title style={styles.pageTitle}>{I18n.t("config_title")}</Title>
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
                <Text style={styles.label}>{I18n.t("config_lang")}</Text>
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
                      <Picker.Item label={I18n.t("config_es")} value={"es"} />
                      <Picker.Item label={I18n.t("config_en")} value={"en"} />
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.inputHolder}>
                <Text style={styles.label}>{I18n.t("config_alg")}</Text>
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
                      <Picker.Item
                        label={I18n.t("config_alg_normal")}
                        value={"0"}
                      />
                      <Picker.Item
                        label={I18n.t("config_alg_ml")}
                        value={"1"}
                      />
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
