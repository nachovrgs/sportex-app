import { Navigation } from "react-native-navigation";

import { registerScreens, screens } from "./screens";

import { isLoggedIn } from "./helpers/storage";

import { logInfo } from "./helpers/logger";

// call from index.js
async function init() {
  logInfo("Initializing app");
  var isLogged = await isLoggedIn();
  if (isLogged) {
    startMainApp();
  } else {
    startLogin();
  }
}

// For Authentication
export function startLogin() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: screens.login.id,
      title: screens.login.title,
      navigatorStyle: {},
      navigatorButtons: {}
    }
  });
}

// Main app
export function startMainApp() {
  // start the main app
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: "",
        screen: screens.eventFeed.id,
        icon: require("./assets/images/home.png"),
        selectedIcon: require("./assets/images/home.png"),
        title: screens.eventFeed.title
      },
      {
        label: "",
        screen: screens.groups.id,
        icon: require("./assets/images/groups.png"),
        selectedIcon: require("./assets/images/groups.png"),
        title: screens.groups.title
      },
      {
        label: "",
        screen: screens.historyFeed.id,
        icon: require("./assets/images/history.png"),
        selectedIcon: require("./assets/images/history.png"),
        title: screens.historyFeed.title
      },
      {
        label: "",
        screen: screens.currentEventFeed.id,
        icon: require("./assets/images/currentEvents.png"),
        selectedIcon: require("./assets/images/currentEvents.png"),
        title: screens.currentEventFeed.title
      },
      {
        label: "",
        screen: screens.userProfile.id,
        icon: require("./assets/images/profile.png"),
        selectedIcon: require("./assets/images/profile.png"),
        title: screens.userProfile.title
      }
    ],
    tabsStyle: {
      tabBarButtonColor: "#ecf0f1",
      tabBarSelectedButtonColor: "#e74c3c",
      tabBarBackgroundColor: "#2c3e50",
      initialTabIndex: 0 // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
    },
    appStyle: {
      tabBarButtonColor: "#ecf0f1",
      tabBarSelectedButtonColor: "#e74c3c",
      tabBarBackgroundColor: "#2c3e50",
      initialTabIndex: 0 // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
    },
    animationType: "slide-down" // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
  });
}

registerScreens();
init();
