import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  headHolder: {
    flexDirection: "row",
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  imageHolder: {
    height: 130,
    flex: 2
  },
  image: {
    paddingVertical: 30,
    width: 70,
    height: 70,
    borderRadius: 35
  },
  nameHolder: {
    height: 130,
    paddingTop: 30,
    paddingLeft: 10,
    flex: 5
  },
  name: {
    fontSize: sizes.medium,
    color: colors.text,
    fontWeight: "200"
  },
  nameInput: {
    width: 250,
    height: 40,
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.text_grey,
    elevation: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  divider: {
    paddingLeft: 30,
    paddingRight: 30
  },
  inviteHolder: {
    marginLeft: 30,
    marginTop: 10,
    marginRight: 30
  },
  inviteTitle: {
    marginTop: 10,
    fontSize: sizes.large,
    color: colors.text,
    fontWeight: "300"
  },
  playersHolder: {
    height: 300
  },
  playerSearchHolder: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    width: 350,
    padding: 5,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: colors.borders,
    height: 40,
    elevation: 1
  },
  userList: {
    height: 200,
    marginTop: 20,
    marginLeft: -10,
    marginRight: -10
  },
  noUsers: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  participant: {
    height: 60,
    flex: 1,
    flexDirection: "row"
  },
  iconHolder: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  participantIcon: {
    height: sizes.xlarge,
    width: sizes.xlarge,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white
  },
  dataHolder: {
    justifyContent: "center",
    flex: 8
  },
  participantName: {
    fontSize: sizes.large
  },
  selectorHolder: {
    justifyContent: "center",
    flex: 1
  },
  selector: {
    height: sizes.xlarge,
    width: sizes.xlarge
  }
});
