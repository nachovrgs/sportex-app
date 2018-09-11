import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    flex: 6,
    fontSize: sizes.xlarge,
    color: colors.text_light_blue,
    paddingLeft: 10,
    fontWeight: "900"
  },
  close: {
    flex: 1
  },
  playerHolder: {
    flex: 5
  },
  userList: {
    height: 600,
    width: 350,
    marginTop: 10,
    marginBottom: 10
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
    height: sizes.xxlarge,
    width: sizes.xxlarge,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white
  },
  dataHolder: {
    justifyContent: "center",
    paddingLeft: 15,
    flex: 4
  },
  participantName: {
    fontSize: sizes.large
  },
  ratingHolder: {
    justifyContent: "center",
    flex: 6
  },
  buttonHolder: { marginTop: 30 },
  buttonEv: {
    marginTop: 20,
    height: 50,
    width: 300,
    backgroundColor: colors.bar_rank_3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders
  },
  buttonInd: {
    marginTop: 20,
    height: 50,
    width: 300,
    backgroundColor: colors.text_blue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders
  }
});
