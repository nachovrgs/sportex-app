import { StyleSheet } from "react-native";

import { colors } from "../../styles";

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
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  noData: {
    flex: 1,
    alignContent: "center",
    margin: 50,
    backgroundColor: colors.background
  },
  noDataText: {
    justifyContent: "center",
    alignItems: "center"
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center"
  },
  groupList: {
    flex: 1
  }
});
