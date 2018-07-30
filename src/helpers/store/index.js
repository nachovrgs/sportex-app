import store from "react-native-simple-store";
import { STORE_EXPIRATION_HOURS } from "../../constants";

//Events
export async function saveEvents(events) {
  await store.delete("events");
  await store.save("events", {
    items: events,
    stored: new Date()
  });
}
export async function updateEvents(events) {
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
  await store.delete("groups");
  await store.save("groups", {
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
  await store.delete("currentEvents");
  await store.save("currentEvents", {
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

//Notifications
export async function saveNotifications(notifications) {
  await store.delete("notifications");
  await store.save("notifications", {
    items: notifications,
    stored: new Date()
  });
}
export async function getNotifications() {
  var notifications = await store.get("notifications");
  if (notifications != null) {
    var diff = Math.abs(new Date() - notifications.stored) / 36e5;
    if (diff > STORE_EXPIRATION_HOURS) {
      store.delete("notifications");
      return [];
    } else {
      return notifications.items;
    }
  } else {
    return [];
  }
}

//PastEvents
export async function savePast(pastEvents) {
  await store.delete("pastEvents");
  await store.save("pastEvents", {
    items: pastEvents,
    stored: new Date()
  });
}
export async function getPast() {
  var pastEvents = await store.get("pastEvents");
  if (pastEvents != null) {
    var diff = Math.abs(new Date() - pastEvents.stored) / 36e5;
    if (diff > STORE_EXPIRATION_HOURS) {
      store.delete("pastEvents");
      return [];
    } else {
      return pastEvents.items;
    }
  } else {
    return [];
  }
}
