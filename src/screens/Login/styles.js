import { StyleSheet } from "react-native";

import { colors } from "../../styles";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    marginLeft: 12,
    marginTop: 45,
    marginBottom: 22,
    marginRight: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.white
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    flex: 1,
    padding: 20
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    opacity: 0.9,
    color: colors.text
  },
  loginInput: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    marginBottom: 15,
    marginLeft: 15,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: colors.button,
    paddingVertical: 15
  },
  loginButton: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700"
  },
  register: {
    margin: 15,
    textAlign: "center"
  },
  button: {
    width: 260,
    height: 45,
    marginLeft: 15,
    marginTop: 15,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    backgroundColor: colors.background
  },
});
