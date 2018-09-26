import { Navigation } from "react-native-navigation";
import I18n from "../i18n";

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
import AddPlayersModal from "./AddPlayersModal";
import AddPlayersSelectionModal from "./AddPlayersSelectionModal";
import AddPlayersConfirmModal from "./AddPlayersConfirmModal";
import AddMembersModal from "./AddMembersModal";
import AddMembersConfirmModal from "./AddMembersConfirmModal";
import RateEventModal from "./RateEventModal";
import RateIndividualModal from "./RateIndividualModal";
import Settings from "./Settings";
import AddLocationModal from "./AddLocationModal";

// Add ALL screens here for easy use all over project
export const screens = {
  login: {
    id: "sportex.Login",
    title: I18n.t("general_sportex"),
    backButtonHidden: true
  },
  register: {
    id: "sportex.Register",
    title: I18n.t("general_sportex"),
    backButtonHidden: false
  },
  eventFeed: {
    id: "sportex.EventFeed",
    title: I18n.t("eventfeed_title"),
    backButtonHidden: true
  },
  createEvent: {
    id: "sportex.CreateEvent",
    title: I18n.t("create_event_title"),
    backButtonHidden: false
  },
  userProfile: {
    id: "sportex.UserProfile",
    title: I18n.t("my_profile_title"),
    backButtonHidden: false
  },
  event: {
    id: "sportex.EventScreen",
    title: I18n.t("agenda_title"),
    backButtonHidden: false
  },
  invitationEvent: {
    id: "sportex.InvitationEventScreen",
    title: "",
    backButtonHidden: false
  },
  groups: {
    id: "sportex.Groups",
    title: I18n.t("group_feed_title"),
    backButtonHidden: true
  },
  groupScreen: {
    id: "sportex.GroupScreen",
    title: I18n.t("group_title"),
    backButtonHidden: false
  },
  createGroup: {
    id: "sportex.CreateGroup",
    title: I18n.t("create_group_title"),
    backButtonHidden: false
  },
  historyFeed: {
    id: "sportex.HistoryFeed",
    title: I18n.t("history_title"),
    backButtonHidden: false
  },
  currentEventFeed: {
    id: "sportex.CurrentEventFeed",
    title: I18n.t("agenda_title"),
    backButtonHidden: true
  },
  notificationFeed: {
    id: "sportex.NotificationFeed",
    title: I18n.t("notif_title"),
    backButtonHidden: false
  },
  profileScreen: {
    id: "sportex.ProfileScreen",
    title: I18n.t("my_profile_title"),
    backButtonHidden: false
  },
  addPlayersModal: {
    id: "sportex.AddPlayersModal",
    title: "Agregar Jugadores",
    backButtonHidden: true
  },
  addPlayersSelectionModal: {
    id: "sportex.AddPlayersSelectionModal",
    title: "Agregar Jugadores",
    backButtonHidden: true
  },
  addPlayersConfirmModal: {
    id: "sportex.AddPlayersConfirmModal",
    title: "Confirmar Jugadores",
    backButtonHidden: true
  },
  addMembersModal: {
    id: "sportex.AddMembersModal",
    title: "Agregar Jugadores",
    backButtonHidden: true
  },
  addMembersConfirmModal: {
    id: "sportex.AddMembersConfirmModal",
    title: "Confirmar Jugadores",
    backButtonHidden: true
  },
  rateEventModal: {
    id: "sportex.RateEventModal",
    title: "Evaluar Evento",
    backButtonHidden: true
  },
  rateIndividualModal: {
    id: "sportex.RateIndividualModal",
    title: "Evaluar Cada Participante",
    backButtonHidden: false
  },
  settings: {
    id: "sportex.Settings",
    title: "Configurcion",
    backButtonHidden: true
  },
  addLocation: {
    id: "sportex.AddLocationModal",
    title: I18n.t("add_location_title"),
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
  Navigation.registerComponent(
    screens.invitationEvent.id,
    () => InvitationEventScreen
  );
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
  Navigation.registerComponent(
    screens.addPlayersModal.id,
    () => AddPlayersModal
  );
  Navigation.registerComponent(
    screens.addPlayersSelectionModal.id,
    () => AddPlayersSelectionModal
  );
  Navigation.registerComponent(
    screens.addPlayersConfirmModal.id,
    () => AddPlayersConfirmModal
  );
  Navigation.registerComponent(
    screens.addMembersModal.id,
    () => AddMembersModal
  );
  Navigation.registerComponent(
    screens.addMembersConfirmModal.id,
    () => AddMembersConfirmModal
  );
  Navigation.registerComponent(screens.rateEventModal.id, () => RateEventModal);
  Navigation.registerComponent(
    screens.rateIndividualModal.id,
    () => RateIndividualModal
  );
  Navigation.registerComponent(screens.settings.id, () => Settings);
  Navigation.registerComponent(screens.addLocation.id, () => AddLocationModal);
}
