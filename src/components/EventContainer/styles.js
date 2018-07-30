import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    height: 120,
    marginLeft: 17,
    marginRight: 17,
    marginTop: 17,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1
  },
  allContainer: {
    flexDirection: "row",
    height: 120
  },
  //Regular
  sidebar: {
    width: 12,
    marginBottom: 2,
    backgroundColor: colors.bar_rank_1,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  mainInfo: {
    padding: 10,
    width: 250,
    flexDirection: "column"
  },
  sideInfo: {
    width: 100,
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
    color: colors.text_blue,
    fontWeight: "bold"
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
    height: 20,
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
  location: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text
  },
  locationContainer: {
    flex: 1,
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
    marginBottom: 5,
    marginRight: 15
  },
  fillIcon: {
    flex: 1,
    fontSize: sizes.large,
    marginTop: 15
  },
  eventImage: {
    height: 25,
    width: 25
  },
  //Expanded
  mapRegion: {
    height: 190,
    flex: 1
  },
  mapContainer: {
    height: 190
  },
  map: {
    height: 190
  },
  swiper: {
    height: 190,
    flex: 1
  },
  swiperCard: {
    height: 190,
    elevation: 3
  },
  mapImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  markerImage: {
    width: 20,
    height: 20
  },
  participantIcon: {
    height: 15,
    width: 15
  },
  participantName: {
    fontSize: sizes.small
  },
  eventDescription: {
    fontSize: sizes.medium,
    margin: 20
  },
  buttonHolder: {
    height: 60,
    marginTop: 10
  },
  button: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1
  }
});
