//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { colors } from "../../styles";
import styles from "./styles";

// create a component
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.setState({
      users: this.props.users
    });
  }
  render() {
    const { users } = this.state;
    if (JSON.stringify(users) != JSON.stringify([])) {
      return (
        <View style={styles.container}>
          <View style={styles.playersHolder}>
            <ScrollView style={styles.userList}>
              {users.length == 0 && (
                <View style={styles.noUsers}>
                  <ActivityIndicator
                    size="large"
                    color={colors.background}
                    animating
                  />
                </View>
              )}
              {users.length > 0 &&
                users.map((user, i) => (
                  <View style={styles.participant}>
                    <View style={styles.iconHolder}>
                      <Image
                        style={styles.participantIcon}
                        source={{
                          uri:
                            user.profileMember.picturePath &&
                            user.profileMember.picturePath != ""
                              ? user.profileMember.picturePath
                              : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                        }}
                      />
                    </View>
                    <View style={styles.dataHolder}>
                      <Text style={styles.participantName}>
                        {user.profileMember.account.username}
                      </Text>
                    </View>
                    <View style={styles.selectorHolder}>
                      {this.state.addingMemberId == user.standardProfileID && (
                        <Image
                          style={styles.selector}
                          source={require("../../assets/images/ok.png")}
                        />
                      )}
                      {this.state.addingMemberId != user.standardProfileID && (
                        <TouchableOpacity onPress={() => this.addMember({})}>
                          <Image
                            style={styles.selector}
                            source={require("../../assets/images/add.png")}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
