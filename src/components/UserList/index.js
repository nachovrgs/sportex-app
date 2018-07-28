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
      users: [],
      callback: null,
      removingMemberId: 0,
      userSelected: null
    };
    this.removeMemberAction = this.removeMemberAction.bind(this);
  }
  componentDidMount() {
    this.setState({
      users: this.props.users,
      callback: this.props.callback,
      creatorId: this.props.creatorId,
      isOwner: this.props.isOwner
    });
  }
  removeMemberAction = memberId => {
    this.state.callback(memberId);
    this.setState({ removingMemberId: memberId });
    setTimeout(() => {
      this.setState({ removingMemberId: 0 });
      this.setState({ userSelected: null });
    }, 400);
  };
  toggleUserSelected = userId => {
    if (this.state.userSelected == null) {
      this.setState({ userSelected: userId });
    } else if (this.state.userSelected != userId) {
      this.setState({ userSelected: userId });
    } else {
      this.setState({ userSelected: null });
    }
  };
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
                    <TouchableOpacity
                      style={styles.participantInfoHolder}
                      onPress={() =>
                        this.toggleUserSelected(user.standardProfileID)
                      }
                    >
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
                    </TouchableOpacity>
                    <View style={styles.selectorHolder}>
                      {this.state.isOwner &&
                        this.state.removingMemberId ==
                          user.standardProfileID && (
                          <Image
                            style={styles.selector}
                            source={require("../../assets/images/ok.png")}
                          />
                        )}
                      {this.state.isOwner &&
                        this.state.removingMemberId != user.standardProfileID &&
                        this.state.creatorId != user.standardProfileID &&
                        this.state.userSelected == user.standardProfileID && (
                          <TouchableOpacity
                            onPress={() =>
                              this.removeMemberAction(user.standardProfileID)
                            }
                          >
                            <Image
                              style={styles.selector}
                              source={require("../../assets/images/kick.png")}
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
