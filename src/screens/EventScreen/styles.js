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
  //Level 1
  head: {
    flex: 1,
    flexDirection: "row"
  },
  content: {
    flex: 4,
    marginTop: 20,
    flexDirection: "column"
  },
  footer: {
    flex: 4
  },
  //Level 2
  headInfo: {
    flex: 5,
    flexDirection: "column",
    marginTop: 5
  },
  titleContainer: {
    flex: 3
  },
  subTitleContainer: {
    flex: 2
  },
  title: {
    flex: 1,
    fontSize: sizes.xlarge,
    color: colors.text_blue
  },
  subtitle: {
    flex: 1,
    flexDirection: "row"
  },
  date: {
    fontSize: sizes.large,
    color: colors.text_light_blue
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
  locationContainer: { flex: 1 },
  location: {
    fontSize: sizes.medium,
    color: colors.text_grey
  },
  mapContainer: {
    flex: 10
  },
  map: {
    flex: 3
  },
  descriptionContainer: {
    flex: 2,
    padding: 10
  },
  description: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text
  },
  //Footer
  footerTitleContainer: {
    flex: 1
  },
  footerTitle: {
    flex: 1,
    fontSize: sizes.large,
    color: colors.text_blue
  },
  playersContainer: {
    flex: 5
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
    height: 180
  },
  swiperCard: {
    height: 180,
    elevation: 3
  },
  button: {
    flex: 1
  }
});
