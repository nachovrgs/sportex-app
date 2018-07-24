import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderBottomColor: colors.borders,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  noEventsContainer: {
    flex: 1,
    backgroundColor: colors.background
  },
  noEventsSubContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noEventsImage: {
    width: 40,
    height: 40
  },
  noEventsText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold"
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center"
  },
  //Level 1
  head: {
    height: 85,
    flexDirection: "row",
    paddingTop: 20
  },
  content: {
    height: 210,
    flexDirection: "column",
    paddingTop: 30
  },
  footer: {
    height: 450,
    paddingTop: 20
  },
  //Level 2
  headInfo: {
    flex: 5,
    flexDirection: "column",
    marginTop: 5
  },
  titleContainer: {
    height: 35,
    flexDirection: "row"
  },
  subTitleContainer: {
    height: 30
  },
  title: {
    fontSize: sizes.xlarge,
    color: colors.text_light_blue,
    fontWeight: "900"
  },
  ownerEditButton: {
    height: 15,
    width: 15,
    padding: 0,
    marginLeft: 30,
    marginTop: 5
  },
  subtitle: {
    flex: 1,
    flexDirection: "row"
  },
  date: {
    fontSize: sizes.large,
    color: colors.text_blue
  },
  hour: {
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "bold",
    marginTop: 3
  },
  headOptions: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    alignItems: "flex-end"
  },
  //Body
  locationContainer: {
    height: 30
  },
  mapContainer: {
    height: 120,
    marginLeft: -18,
    marginRight: -18
  },
  descriptionContainer: {
    height: 30
  },
  location: {
    height: 50,
    fontSize: sizes.medium,
    color: colors.text_grey
  },
  map: {
    height: 120
  },
  description: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text
  },
  //Footer
  footerTitleContainer: {
    height: 30
  },
  footerTitle: {
    flex: 1,
    fontSize: sizes.large,
    color: colors.text_blue
  },
  playersContainer: {
    height: 250
  },
  //Members
  memberListItem: {
    padding: 0.2,
    alignItems: "center",
    elevation: 1,
    height: 40,
    flexDirection: "row"
  },
  participantIconContainer: {
    flex: 1
  },
  participantNameContainer: {
    flex: 8
  },
  participantIcon: {
    height: 15,
    width: 15,
    marginLeft: 15
  },
  participantName: {
    fontSize: sizes.small
  },
  swiper: {
    height: 250
  },
  swiperCard: {
    height: 250,
    elevation: 1
  },
  button: {
    marginTop: 20,
    height: 50
  },
  exitButton: {
    marginTop: 5
  }
});
