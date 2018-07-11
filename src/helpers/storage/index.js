import { AsyncStorage } from "react-native";

import { logout } from "../navigation";
import {
  TOKEN_NAME_STORE,
  TOKEN_EXP_NAME_STORE,
  ACCOUNT_ID_NAME_STORE,
  PROFILE_ID_NAME_STORE,
  API_URI
} from "../../constants";
import { logInfo, logError } from "../logger";

// Set
export async function setToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_NAME_STORE, token);
  } catch (error) {
    logError(error);
  }
}
export async function setTokenExp(tokenExp) {
  try {
    await AsyncStorage.setItem(TOKEN_EXP_NAME_STORE, tokenExp);
  } catch (error) {
    logError(error);
  }
}
export async function setAccountId(accountId) {
  try {
    await AsyncStorage.setItem(ACCOUNT_ID_NAME_STORE, accountId);
  } catch (error) {
    logError(error);
  }
}
export async function setProfileId(profileId) {
  try {
    await AsyncStorage.setItem(PROFILE_ID_NAME_STORE, profileId);
  } catch (error) {
    logError(error);
  }
}

//Get
export async function getTokenExp() {
  try {
    return await AsyncStorage.getItem(TOKEN_EXP_NAME_STORE);
  } catch (error) {
    logError(error);
    return null;
  }
}
export async function getAccountId() {
  try {
    return await AsyncStorage.getItem(ACCOUNT_ID_NAME_STORE);
  } catch (error) {
    logError(error);
    return null;
  }
}
export async function getProfileId() {
  try {
    return await AsyncStorage.getItem(PROFILE_ID_NAME_STORE);
  } catch (error) {
    logError(error);
    return null;
  }
}
export async function getToken() {
  try {
    return await AsyncStorage.getItem(TOKEN_NAME_STORE);
  } catch (error) {
    logError(error);
    return null;
  }
}
export async function getAllKeys() {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    logError(error);
    return null;
  }
}
//Helper functions
export async function getTokenForUsage() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_NAME_STORE);
    if (token == null) {
      logError("Token is null. Expected a not null token");
      resetAndLogout();
      return null;
    } else {
      return token;
    }
  } catch (error) {
    logError(error);
    resetAndLogout();
    return null;
  }
}

export async function getProfileIdForUsage() {
  try {
    const profileId = await AsyncStorage.getItem(PROFILE_ID_NAME_STORE);
    if (profileId == null) {
      logError(
        "Profile ID is null. Expected a not null profile ID. Something is wrong. Logging out"
      );
      resetAndLogout();
      return null;
    } else {
      return profileId;
    }
  } catch (error) {
    logError(error);
    resetAndLogout();
    return null;
  }
}

export async function getAccountIdForUsage() {
  try {
    const accountId = await AsyncStorage.getItem(ACCOUNT_ID_NAME_STORE);
    if (accountId == null) {
      logError("Account ID is null. Expected a not null account");
      resetAndLogout();
      return null;
    } else {
      return accountId;
    }
  } catch (error) {
    logError(error);
    resetAndLogout();
    return null;
  }
}

export async function setTokenInfo(token, tokenExp, accountId) {
  try {
    setToken(JSON.stringify(token));
    setTokenExp(JSON.stringify(tokenExp));
    setAccountId(JSON.stringify(accountId));
    var profileId = await getProfileFromAccountId(accountId);
    setProfileId(profileId);
    return true;
  } catch (error) {
    logError(error);
    return false;
  }
}

//Extras

export async function getProfileFromAccountId(accountId) {
  return new Promise(resolve => {
    getTokenForUsage().then(receivedToken => {
      fetch(`${API_URI}/standardProfile/account/${accountId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + receivedToken.replace(/"/g, "")
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            logError(
              "Response from server was not ok. Trying to get profile from accountId"
            );
            resetAndLogout();
          }
        })
        .then(jsonResponse => {
          resolve(JSON.stringify(jsonResponse.id));
        })
        .catch(error => {
          logError(error);
          resetAndLogout();
          throw error;
        });
    });
  });
}
export async function resetAndLogout() {
  AsyncStorage.clear().then(() => {
    AsyncStorage.flushGetRequests().then(() => {
      logout();
    });
  });
}
export async function isLoggedIn() {
  var token = await getToken();
  return token != null;
}
