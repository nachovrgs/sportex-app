import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    marginLeft: 12,
    marginTop: 15,
    marginBottom: 22,
    marginRight: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    backgroundColor: colors.white
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  formContainer: {
    flex: 5,
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
    color: colors.text_orange
  },
  loginInput: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    elevation: 1,
    marginBottom: 15,
    marginLeft: 25
  },
  dateInput: {
    height: 40,
    marginLeft: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1,
    alignSelf: "center"
  },
  button: {
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.borders,
    backgroundColor: colors.background
  },
  calendarIcon: {
    width: 20,
    height: 20
  },
  dateTimeText: {
    fontSize: sizes.medium,
    color: colors.text
  },
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
  }
});
