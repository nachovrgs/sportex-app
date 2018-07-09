import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    margin: 22,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1
  },
  head: {
    flex: 1,
    flexDirection: "row"
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row"
  },
  time: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text,
    marginLeft: 10
  },
  titleContainer: {
    flex: 1
  },
  title: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text
  },
  location: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text
  },
  locationContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  eventImage: {
    height: 25,
    width: 25
  },
  info: {
    flex: 3,
    flexDirection: "row"
  }
});