import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  pageTitle: {
    color: colors.text_blue,
    fontWeight: "bold"
  },
  form: {
    flex: 1,
    marginTop: 20
  },
  inputHolder: {
    marginTop: 2,
    marginBottom: 20
  },
  label: {
    height: 18,
    marginLeft: 17,
    color: colors.text
  },
  input: {
    height: 50,
    marginTop: 10,
    borderWidth: 0.5,
    marginLeft: 17,
    marginRight: 17,
    borderColor: colors.text_grey,
    elevation: 1,
    flexDirection: "row",
    flex: 1
  },
  iconHolder: {
    flex: 1,
    padding: 10
  },
  icon: {
    color: colors.text_orange
  },
  content: {
    flex: 9
  },
  valueItem: {
    paddingTop: 17
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center"
  },
  closeImage: {
    width: 25,
    height: 25
  },
  buttonHolder: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    width: 350,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    backgroundColor: colors.background
  },
  textContent: {
    flex: 1
  }
});
