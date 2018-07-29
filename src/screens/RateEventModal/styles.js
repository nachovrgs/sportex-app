import { StyleSheet } from "react-native";

import { colors, sizes } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 120,
    marginBottom: 200,
    padding: 30,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  title: {
    fontSize: sizes.xlarge,
    color: colors.text_orange,
    fontWeight: "900"
  },
  subtitle: {
    fontSize: sizes.medium,
    color: colors.text_grey,
    fontWeight: "bold",
    marginTop: 10
  },
  buttonHolder: { marginTop: 30 },
  buttonEv: {
    marginTop: 20,
    height: 50,
    width: 300,
    backgroundColor: colors.bar_rank_3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders
  },
  buttonInd: {
    marginTop: 20,
    height: 50,
    width: 300,
    backgroundColor: colors.text_blue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borders
  }
});
