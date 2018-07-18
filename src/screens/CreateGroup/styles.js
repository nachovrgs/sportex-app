import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center"
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
  userList: {
    height: 300,
    marginTop: 20
  },
  participantIcon: {
    height: sizes.small,
    width: sizes.small
  },
  participantName: {
    fontSize: sizes.medium
  },
  groupForm: {
    flex: 10
  },
  createButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0
  }
});
