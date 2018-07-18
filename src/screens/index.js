import { Navigation } from "react-native-navigation";

import Login from "./Login";
import RegisterScreen from "./RegisterScreen";
import EventFeed from "./EventFeed";
import CurrentEventFeed from "./CurrentEventFeed";
import HistoryFeed from "./HistoryFeed";
import CreateEvent from "./CreateEvent";
import UserProfile from "./UserProfile";
import EventScreen from "./EventScreen";
import InvitationEventScreen from "./InvitationEventScreen";
import Groups from "./Groups";
import GroupScreen from "./GroupScreen";
import CreateGroup from "./CreateGroup";
import NotificationFeed from "./NotificationFeed";
import ProfileScreen from "./ProfileScreen";

// Add ALL screens here for easy use all over project
export const screens = {
  login: {
    id: "sportex.Login",
    title: "Sportex",
    backButtonHidden: true
  },
  register: {
    id: "sportex.Register",
    title: "Sportex",
    backButtonHidden: false
  },
  eventFeed: {
    id: "sportex.EventFeed",
    title: "Sportex",
    backButtonHidden: true
  },
  createEvent: {
    id: "sportex.CreateEvent",
    title: "Sportex",
    backButtonHidden: false
  },
  userProfile: {
    id: "sportex.UserProfile",
    title: "Sportex",
    backButtonHidden: false
  },
  event: {
    id: "sportex.EventScreen",
    title: "Sportex",
    backButtonHidden: false
  },
  invitationEvent: {
    id: "sportex.InvitationEventScreen",
    title: "Sportex",
    backButtonHidden: false
  },
  groups: {
    id: "sportex.Groups",
    title: "Sportex",
    backButtonHidden: true
  },
  groupScreen: {
    id: "sportex.GroupScreen",
    title: "Sportex",
    backButtonHidden: false
  },
  createGroup: {
    id: "sportex.CreateGroup",
    title: "Sportex",
    backButtonHidden: false
  },
  historyFeed: {
    id: "sportex.HistoryFeed",
    title: "Sportex",
    backButtonHidden: true
  },
  currentEventFeed: {
    id: "sportex.CurrentEventFeed",
    title: "Agenda",
    backButtonHidden: true
  },
  notificationFeed: {
    id: "sportex.NotificationFeed",
    title: "Notificaciones",
    backButtonHidden: false
  },
  profileScreen: {
    id: "sportex.ProfileScreen",
    title: "Sportex",
    backButtonHidden: false
  }
};

// This registers all screens
export function registerScreens() {
  Navigation.registerComponent(screens.login.id, () => Login);
  Navigation.registerComponent(screens.register.id, () => RegisterScreen);
  Navigation.registerComponent(screens.eventFeed.id, () => EventFeed);
  Navigation.registerComponent(screens.createEvent.id, () => CreateEvent);
  Navigation.registerComponent(screens.userProfile.id, () => UserProfile);
  Navigation.registerComponent(screens.event.id, () => EventScreen);
  Navigation.registerComponent(screens.invitationEvent.id, () => InvitationEventScreen);
  Navigation.registerComponent(screens.groups.id, () => Groups);
  Navigation.registerComponent(screens.createGroup.id, () => CreateGroup);
  Navigation.registerComponent(screens.groupScreen.id, () => GroupScreen);
  Navigation.registerComponent(screens.historyFeed.id, () => HistoryFeed);
  Navigation.registerComponent(
    screens.currentEventFeed.id,
    () => CurrentEventFeed
  );
  Navigation.registerComponent(
    screens.notificationFeed.id,
    () => NotificationFeed
  );
  Navigation.registerComponent(screens.profileScreen.id, () => ProfileScreen);
}
