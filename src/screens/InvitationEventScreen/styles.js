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
  head: {
    flex: 1,
    flexDirection: "row"
  },
  headInfo: {
    flex: 5,
    flexDirection: "column",
    marginTop: 20
  },
  titleContainer: {
    flex: 3
  },
  title: {
    flex: 1,
    fontSize: sizes.xlarge,
    color: colors.text_blue
  },
  subTitleContainer: {
    flex: 2,
    flexDirection: "row"
  },
  subtitle: {
    flex: 1,
    fontSize: sizes.large,
    color: colors.text_light_blue
  },
  splitter: { flex: 1 },
  hour: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "bold"
  },
  headOptions: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    alignItems: "flex-end"
  },
  exitIconContainer: {
    flex: 1
  },
  exitIcon: {
    height: 15,
    width: 15
  },
  content: {
    flex: 3,
    marginTop: 60,
    flexDirection: "column"
  },
  map: {
    flex: 5
  },
  descriptionContainer: {
    flex: 1
  },
  description: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text
  },
  footer: {
    flex: 3
  },
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
  participantIcon: {
    height: 15,
    width: 15
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
