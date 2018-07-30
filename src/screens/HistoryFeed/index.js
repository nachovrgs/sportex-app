//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image
} from "react-native";
import { Container, Header, Content, Toast, Button, Root } from "native-base";
import { PastEventContainer } from "../../components";

import { screens } from "../../screens";

import { getPast, savePast } from "../../helpers/store";
import { getTokenForUsage, getProfileIdForUsage } from "../../helpers/storage";
import { API_URI } from "../../constants";
import styles from "./styles";
import { colors } from "../../styles";

// create a component
export default class HistoryFeed extends Component {
  //Navigation
  static navigatorStyle = {
    navBarTextColor: "#ecf0f1",
    navBarBackgroundColor: colors.navbar,
    navBarButtonColor: colors.text_orange,
    navBarComponentAlignment: "center",
    navBarTextAlignment: "center"
  };
  static navigatorButtons = {};
  _keyExtractor = (item, index) => item.id.toString();

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      token: "",
      profileId: "",
      refreshing: false,
      noEventsShowed: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentDidMount() {
    this.getStoragePastEvents();
  }

  async getStoragePastEvents() {
    this.setState({ refreshing: true });
    var events = await getPast();

    this.setState({
      dataSource: events
    });
    this.loadStorageItems();
  }
  // Handle nav bar navigation
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
    }
  }
  _renderItem = ({ item }) => (
    <PastEventContainer
      eventItem={item}
      navigator={this.props.navigator}
      masterCallback={(eventId, evaluation) =>
        this.evaluateAction(eventId, evaluation)
      }
    />
  );
  async loadStorageItems() {
    this.state.token = await getTokenForUsage();
    this.state.profileId = await getProfileIdForUsage();
    this.loadData();
  }
  async loadData() {
    fetch(`${API_URI}/event/past/${this.state.profileId}`, {
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
            refreshing: false
          });
          Toast.show({
            text: "Imposible conectarse al servidor. Tienes internet?",
            buttonText: "Ok"
          });
        }
      })
      .then(jsonResponse => {
        if (jsonResponse.length == 0 && !this.state.noEventsShowed) {
          Toast.show({
            text: "No jugaste ningun partido! Inscribite a uno.",
            buttonText: "Ok",
            onClose: this.toggleNoEventsShowed
          });
        }
        this.setState({
          dataSource: jsonResponse,
          refreshing: false
        });
        savePast(jsonResponse);
      })
      .catch(error => {
        this.setState({
          refreshing: false
        });
        Toast.show({
          text: "Ocurrio un error!",
          buttonText: "Ok"
        });
      });
  }

  evaluateAction = (eventId, evaluation) => {
    fetch(`${API_URI}/playerReview/ReviewAllEventParticipants`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          (this.state.token ? this.state.token.replace(/"/g, "") : ""),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Rate: evaluation,
        Message: "Buen Partido!",
        IdProfileReviews: this.state.profileId,
        IdProfileReviewed: 0,
        EventID: eventId
      })
    })
      .then(response => {
        if (response.ok) {
          this.setState({ dataSource: [] });
          this._refreshListView();
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  toggleNoEventsShowed = () => {
    this.state.noEventsShowed = true;
  };
  _refreshListView = () => {
    this.setState({ refreshing: true });
    this.loadData();
  };
  _refreshControl() {
    return (
      <RefreshControl
        title="buscando eventos pasados"
        titleColor={colors.text_orange}
        refreshing={this.state.refreshing}
        onRefresh={() => this._refreshListView()}
      />
    );
  }
  render() {
    return this.state.dataSource.length == 0 ? (
      <Root>
        <View style={styles.noEventsContainer}>
          <TouchableOpacity
            style={styles.noEventsSubContainer}
            onPress={() => this._refreshListView()}
          >
            <Image
              style={styles.noEventsImage}
              source={require("../../assets/images/none.png")}
            />
            <Text style={styles.noEventsText}>Refrescar</Text>
          </TouchableOpacity>
        </View>
      </Root>
    ) : (
      <Root>
        <View style={styles.container}>
          <FlatList
            refreshControl={this._refreshControl()}
            style={styles.eventList}
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </Root>
    );
  }
}
