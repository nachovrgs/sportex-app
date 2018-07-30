import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  sectionTitle: {
    fontSize: sizes.large,
    color: colors.text_blue,
    fontWeight: "800"
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    flexDirection: "row"
  },
  imageContainer: {
    flex: 3
  },
  avatar: {
    paddingVertical: 30,
    width: 90,
    height: 90,
    borderRadius: 45
  },
  titleContainer: {
    flex: 7,
    marginLeft: 20,
    marginTop: -15
  },
  title: {
    fontSize: sizes.xlarge,
    color: colors.text_blue,
    fontWeight: "900"
  },
  username: {
    fontSize: sizes.large,
    color: colors.text_light_blue,
    fontWeight: "200",
    marginTop: 5
  },
  rating: {
    height: 70,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  ratingSubtitle: {
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "200"
  },
  challenges: {
    height: 120,
    padding: 10
  },
  challengesGroups: {
    alignItems: "center"
  },

  challengesTitleHolder: { flex: 1 },
  challengesContentHolder: { flex: 2, flexDirection: "row" },
  played: {
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    padding: 10
  },
  playedSubtitle: {
    marginLeft: 20,
    marginTop: 2,
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "200"
  },
  sharedGroups: {
    height: 120,
    padding: 10
  },
  groups: {
    alignItems: "center"
  },
  sharedGroupsTitleHolder: { flex: 1 },

  descriptionContainer: { flex: 1 },

  divider: {
    height: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  groupHolder: {
    width: 50
  },
  groupItem: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white
  }
});
