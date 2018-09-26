import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center"
  },
  map: { flex: 15 },
  inputHolder: {
    flex: 2,
    marginTop: 2,
    height: 70,
    paddingBottom: 20,
    paddingTop: 20
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
    flex: 1,
    padding: 10
  },
  valueItem: {
    paddingTop: 17
  }
});
