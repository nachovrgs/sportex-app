import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  playersHolder: {
    height: 400
  },
  playerSearchHolder: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    width: 350,
    padding: 5,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: colors.borders,
    height: 40,
    elevation: 1
  },
  userList: {
    height: 300,
    marginTop: 20,
    marginLeft: -10,
    marginRight: -10
  },
  noUsers: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  participant: {
    height: 60,
    flex: 1,
    flexDirection: "row"
  },
  iconHolder: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  participantIcon: {
    height: sizes.xlarge,
    width: sizes.xlarge,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white
  },
  dataHolder: {
    justifyContent: "center",
    flex: 8
  },
  participantName: {
    fontSize: sizes.large
  },
  selectorHolder: {
    justifyContent: "center",
    flex: 1
  },
  selector: {
    height: sizes.xlarge,
    width: sizes.xlarge
  }
});
