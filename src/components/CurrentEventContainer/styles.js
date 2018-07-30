import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    height: 120,
    margin: 22,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1
  },
  allContainer: {
    flexDirection: "row",
    flex: 7
  },
  //Regular
  sidebar: {
    flex: 1,
    backgroundColor: colors.bar_rank_2,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  mainInfo: {
    flex: 10,
    flexDirection: "column"
  },
  sideInfo: {
    flex: 3,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  head: {
    flex: 1,
    flexDirection: "row"
  },
  titleContainer: {
    flex: 2
  },
  title: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text_blue,
    fontWeight: "bold"
  },
  name: {
    flex: 1,
    fontSize: sizes.medium
  },
  userContainer: {
    flex: 2,
    flexDirection: "row"
  },
  user: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text,
    marginLeft: 10
  },
  profilePic: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
  },
  timeIcon: {
    fontSize: sizes.medium
  },
  time: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text,
    marginLeft: 10
  },
  hour: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "bold"
  },
  hourContainer: {
    flex: 2,
    alignItems: "flex-end"
  },
  fillContainer: {
    flex: 2,
    paddingTop: 30,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10
  },
  fill: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text,
    marginBottom: 5
  },
  fillIcon: {
    flex: 1,
    fontSize: sizes.large,
    marginTop: 5,
    marginLeft: 15
  },
  eventImage: {
    height: 25,
    width: 25
  },
  //Expanded
  map: {
    flex: 10
  },
  button: {
    flex: 2
  }
});
