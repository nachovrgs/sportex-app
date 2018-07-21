import { StyleSheet } from "react-native";

import { colors } from "../../styles";

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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.white
  },
  head: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  imageContainer: {
    flex: 3
  },
  avatar: {
    paddingVertical: 30,
    width: 100,
    height: 100,
    borderRadius: 50
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    color: colors.text
  },
  body: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  descriptionContainer: { flex: 1 }
});
