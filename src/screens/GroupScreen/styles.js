import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loading: {
    height: sizes.xlarge,
    width: sizes.xlarge,
    color: colors.black
  },
  head: {
    marginTop: 20,
    height: 150
  },
  closeHolder: {
    position: "absolute",
    right: 10,
    top: 10
  },
  imageContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    height: 300,
    width: 300
  },
  titleContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
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
    height: 500
  },
  infoContainer: {
    height: 50,
    marginLeft: 20
  },
  ownerDesc: {
    fontSize: sizes.medium,
    color: colors.text
  },
  owner: {
    fontSize: sizes.medium,
    color: colors.text_grey
  },
  addPlayersHolder: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0.5,
    shadowColor: colors.text_grey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    borderColor: colors.text_grey,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  addPlayers: {
    flex: 1,
    flexDirection: "row"
  },
  addPlayersImageHolder: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  addPlayersImage: {
    height: 30,
    width: 30,
    tintColor: colors.text_orange
  },
  addPlayersTextHolder: {
    flex: 8,
    justifyContent: "center"
  },
  addPlayersText: {
    fontSize: sizes.medium,
    color: colors.text
  },
  membersContainer: {
    marginTop: 30,
    height: 400
  },
  membersHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  membersTitle: {
    flex: 3,
    fontSize: sizes.large,
    fontWeight: "800",
    color: colors.text
  },
  membersTotal: {
    flex: 7,
    marginTop: 7,
    fontSize: sizes.small,
    color: colors.text_blue
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
    marginTop: -120
  },
  queryResultItem: {
    opacity: 1,
    color: colors.text
  },
  avatar: {
    paddingVertical: 30,
    width: 80,
    height: 80,
    borderRadius: 40
  }
});
