import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    marginLeft: 25,
    marginTop: 40,
    marginBottom: 40,
    marginRight: 25,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.white
  },
  head: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row"
  },
  avatar: {
    height: sizes.xlarge,
    width: sizes.xlarge
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    flex: 7
  },
  title: {
    fontSize: sizes.large,
    color: colors.text_blue
  },
  description: {
    fontSize: sizes.medium,
    color: colors.text_grey
  },
  body: {
    flex: 10,
    marginTop: 20
  },
  infoContainer: { flex: 1 },
  ownerDesc: {
    fontSize: sizes.medium,
    color: colors.text
  },
  owner: {
    fontSize: sizes.medium,
    color: colors.text_grey
  },
  membersContainer: {
    flex: 2,
    marginTop: 10
  },
  participantIcon: {
    height: 15,
    width: 15
  },
  participantName: {
    fontSize: sizes.small
  },
  addMemberContainer: {
    flex: 1
  },
  autocompleteContainer: {
    width: 300
  },
  queryResultContainer: {
    flex: 1
  },
  queryResultItem: {
    opacity: 1,
    color: colors.text
  },
});
