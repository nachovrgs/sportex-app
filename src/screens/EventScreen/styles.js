import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderBottomColor: colors.borders,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 15
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
    paddingTop: 5
  },
  content: {
    height: 210,
    flexDirection: "column",
    paddingTop: 5
  },
  footer: {
    height: 450,
    paddingTop: 5
  },
  //Level 2
  headInfo: {
    flex: 5,
    flexDirection: "column",
    marginTop: 5
  },
  titleContainer: {
    height: 35,
    flex: 1,
    flexDirection: "row"
  },
  subTitleContainer: {
    height: 30
  },
  editHolder: {
    flex: 1
  },
  titleHolder: {
    flex: 4
  },
  title: {
    fontSize: sizes.xlarge,
    color: colors.text_light_blue,
    fontWeight: "900"
  },
  titleEdit: {
    width: 250,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    height: 30,
    elevation: 1
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
  dateEditHolder: {
    width: 100
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
    height: 130,
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
  locationPicker: {
    width: 200,
    height: 50,
    marginTop: -15,
    marginLeft: -10
  },
  locationPickerItem: {
    fontSize: sizes.medium,
    color: colors.text_grey
  },

  map: {
    height: 130
  },
  markerImage: {
    width: 20,
    height: 20
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
    height: 150
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
    height: 150
  },
  swiperCard: {
    height: 150,
    elevation: 1
  },
  button: {
    marginTop: 20,
    height: 50
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.button_green
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.button_red
  },
  exitButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.button_red
  }
});
