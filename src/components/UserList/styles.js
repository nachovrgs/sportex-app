import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  playersHolder: {
    height: 300
  },
  userList: {
    height: 200
  },
  noUsers: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  participant: {
    height: 60,
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.text_grey
  },
  participantInfoHolder: {
    flex: 8,
    flexDirection: "row"
  },
  iconHolder: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  participantIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white
  },
  dataHolder: {
    justifyContent: "center",
    paddingLeft: 15,
    flex: 9
  },
  participantName: {
    fontSize: sizes.large,
    fontWeight: "200"
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
