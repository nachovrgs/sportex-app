import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10
  },
  header: {
    marginTop: 30
  },
  title: {
    fontSize: sizes.xlarge,
    color: colors.text_orange,
    fontWeight: "900"
  },
  subtitle: {
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "bold",
    marginTop: 10
  },
  close: {
    position: "absolute",
    right: 0,
    top: 0
  },
  playerSearchHolder: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    width: 350,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders,
    backgroundColor: colors.white,
    height: 40,
    elevation: 1
  },
  userList: {
    height: 450,
    marginTop: 20,
    marginLeft: -10,
    marginRight: -10,
    backgroundColor: colors.white
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
  },
  buttonHolder: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  inviting: {
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "bold"
  },
  button: {
    height: 40,
    width: 300,
    backgroundColor: colors.text_orange,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.borders
  }
});
