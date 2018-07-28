import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 120,
    marginBottom: 150,
    height: 500,
    padding: 30,
    backgroundColor: colors.white,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  close: {
    position: "absolute",
    right: 5,
    top: 5
  },
  header: {
    position: "absolute",
    top: 20,
    height: 50
  },
  title: {
    fontSize: sizes.large,
    color: colors.text_orange,
    fontWeight: "900"
  },
  userList: {
    height: 300,
    width: 300,
    marginTop: 70,
    marginBottom: 100,
    backgroundColor: colors.white
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
  buttonHolder: {
    position: "absolute",
    bottom: 50,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
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
