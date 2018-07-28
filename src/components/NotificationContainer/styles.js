import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 1,
    borderWidth: 0.2,
    borderColor: colors.text_grey,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  swipeContainerRemove: {
    height: 60,
    width: 75,
    padding: 10,
    backgroundColor: colors.button_red,
    borderRadius: 1,
    borderWidth: 0.2,
    borderColor: colors.text_grey,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  swiperImage: {
    width: 30,
    height: 30,
    color: colors.white
  },
  head: {
    flex: 9
  },
  titleContainer: {
    flex: 2
  },
  title: {
    flex: 1,
    fontSize: sizes.medium,
    color: colors.text
  },
  subtitleContainer: {
    flex: 1
  },
  subtitle: {
    flex: 1,
    fontSize: sizes.small,
    color: colors.text_grey
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dotImage: {
    width: 10,
    height: 10,
    tintColor: colors.bar_rank_1
  }
});
