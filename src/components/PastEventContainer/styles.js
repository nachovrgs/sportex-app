import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    height: 120,
    margin: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
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
    padding: 10,
    flexDirection: "column"
  },
  sideInfo: {
    flex: 5,
    padding: 10
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
    color: colors.background
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
    width: 20,
    height: 20
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
  location: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text
  },
  locationContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  fill: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text
  },
  fillContainer: {
    flex: 2,
    marginTop: 30,
    alignItems: "flex-end"
  },
  fillIcon: {
    fontSize: sizes.medium,
    marginRight: 10
  },
  eventImage: {
    height: 25,
    width: 25
  },
  //Expanded
  map: {
    flex: 10
  },
  ratingContainer: {
    flexDirection: "row"
  },
  rating: {
    flex: 3
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    width: 100
  }
});
