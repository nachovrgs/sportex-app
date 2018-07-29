import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    height: 60,
    padding: 10,
    backgroundColor: colors.white,
    borderWidth: 0.2,
    borderColor: colors.text_grey,
    elevation: 1,
    flexDirection: "row"
  },
  swipeContainerRemove: {
    height: 60,
    width: 75,
    padding: 10,
    backgroundColor: colors.text_orange,
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
    tintColor: colors.white
  },
  swipertext: {
    fontSize: sizes.small,
    color: colors.white,
    fontWeight: "100"
  },
  avatarHolder: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white
  },
  dataHolder: {
    justifyContent: "center",
    padding: 10,
    flex: 9
  },
  name: {
    fontSize: sizes.medium,
    color: colors.text_blue,
    fontWeight: "600"
  },
  time: {
    fontSize: sizes.small,
    color: colors.text_grey,
    fontWeight: "200"
  },
  info: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  dotImage: {
    width: 10,
    height: 10,
    tintColor: colors.text_orange,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  },
  dotText: {
    fontSize: 7,
    color: colors.text_orange,
    fontWeight: "100",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 7
  }
});
