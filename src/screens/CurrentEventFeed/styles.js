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
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center"
  },
  eventList: {
    flex: 1
  }
});
