import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 15,
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
  infoContainer: {
    flex: 3,
    marginLeft: 15
  },
  ownerDesc: {
    fontSize: sizes.medium,
    color: colors.text
  },
  owner: {
    fontSize: sizes.medium,
    color: colors.text_grey
  },
  membersContainer: {
    flex: 7
  },
  membersHeader: {
    flex: 1,
    flexDirection: "row"
  },
  membersTitle: {
    flex: 8
  },
  membersEdit: {
    flex: 2
  },
  membersEditButton: {
    height: 15,
    width: 15,
    padding: 0,
    marginLeft: 30
  },
  memberList: {
    flex: 9
  },
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
  participantRemoveContainer: {
    flex: 1
  },
  participantRemoveIcon: {
    height: 30,
    width: 30
  },
  participantIcon: {
    height: 30,
    width: 30
  },
  participantName: {
    fontSize: sizes.small
  },
  addMemberContainer: {
    flex: 1,
    flexDirection: "row"
  },
  autocompleteContainer: {
    flex: 5
  },
  buttonContainer: {
    flex: 1,
    alignSelf: "center",
    marginLeft: 5
  },
  button: {
    width: 40,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    backgroundColor: colors.background
  },
  queryResultContainer: {
    flex: 1
  },
  queryResultItem: {
    opacity: 1,
    color: colors.text
  }
});
