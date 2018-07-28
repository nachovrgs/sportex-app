import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    margin: 22,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    flexDirection: "row"
  },
  head: {
    flex: 1
  },
  groupImage: {
    height: 60,
    width: 60,
    marginLeft: -5,
    marginTop: -5
  },
  info: {
    flex: 3,
    flexDirection: "column"
  },
  titleContainer: {
    flex: 2
  },
  title: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text_blue
  },
  membersContainer: {
    flex: 1,
    marginTop: 10
  },
  members: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text_grey
  }
});
