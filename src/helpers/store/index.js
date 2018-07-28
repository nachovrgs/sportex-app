import store from "react-native-simple-store";
import { STORE_EXPIRATION_HOURS } from "../../constants";

//Events
export async function saveEvents(events) {
  await store.update("events", {
    items: events,
    stored: new Date()
  });
}
export async function getEvents() {
  var events = await store.get("events");
  if (events != null) {
    var diff = Math.abs(new Date() - events.stored) / 36e5;
    if (diff > STORE_EXPIRATION_HOURS) {
      store.delete("events");
      return [];
    } else {
      return events.items;
    }
  } else {
    return [];
  }
}

//Groups
export async function saveGroups(groups) {
  await store.update("groups", {
    items: groups,
    stored: new Date()
  });
}
export async function getGroups() {
  var groups = await store.get("groups");
  if (groups != null) {
    var diff = Math.abs(new Date() - groups.stored) / 36e5;
    if (diff > STORE_EXPIRATION_HOURS) {
      store.delete("groups");
      return [];
    } else {
      return groups.items;
    }
  } else {
    return [];
  }
}

//Current Events
export async function saveCurrentEvents(currentEvents) {
  await store.update("currentEvents", {
    items: currentEvents,
    stored: new Date()
  });
}
export async function getCurrentEvents() {
  var currentEvents = await store.get("currentEvents");
  if (currentEvents != null) {
    var diff = Math.abs(new Date() - currentEvents.stored) / 36e5;
    if (diff > STORE_EXPIRATION_HOURS) {
      store.delete("currentEvents");
      return [];
    } else {
      return currentEvents.items;
    }
  } else {
    return [];
  }
}
