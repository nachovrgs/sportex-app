import { AsyncStorage } from 'react-native';

import { logout } from '../navigation';
import { TOKEN_NAME_STORE, TOKEN_EXP_NAME_STORE, ACCOUNT_ID_NAME_STORE } from '../../constants'
import { logInfo, logError } from '../logger'

// Token
export async function getToken() {
  try {
    return await AsyncStorage.getItem(TOKEN_NAME_STORE);
  } catch (error) {
    logError(error)
    return null;
  }
}

export async function setToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_NAME_STORE, token);
  } catch (error) {
    logError(error)
  }
}

export async function getTokenExp() {
  try {
    return await AsyncStorage.getItem(TOKEN_EXP_NAME_STORE);
  } catch (error) {
    logError(error)
    return null;
  }
}
export async function getAccountId() {
  try {
    return await AsyncStorage.getItem(ACCOUNT_ID_NAME_STORE);
  } catch (error) {
    logError(error)
    return null;
  }
}
export async function setTokenExp(tokenExp) {
  try {
    await AsyncStorage.setItem(TOKEN_EXP_NAME_STORE, tokenExp);
  } catch (error) {
    logError(error)
  }
}
export async function setAccountId(accountId) {
  try {
    await AsyncStorage.setItem(ACCOUNT_ID_NAME_STORE, accountId);
  } catch (error) {
    logError(error)
  }
}
//Helper functions
export async function getTokenForUsage() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_NAME_STORE);
    if (token == null) {
      logError("Token is null. Expected a not null token")
      logout()
      return null
    }
    else {
      return token
    }
  } catch (error) {
    logError(error)
    logout()
    return null
  }
}
export async function getAccountIdForUsage() {
  try {
    const accountId = await AsyncStorage.getItem(ACCOUNT_ID_NAME_STORE);
    if (accountId == null) {
      logError("Account ID is null. Expected a not null account")
      logout()
      return null
    }
    else {
      return accountId
    }
  } catch (error) {
    logError(error)
    logout()
    return null
  }
}
export async function setTokenInfo(token, tokenExp, accountId) {
  try {
    setToken(JSON.stringify(token))
    setTokenExp(JSON.stringify(tokenExp))
    setAccountId(JSON.stringify(accountId))
    return true
  } catch (error) {
    logError(error)
    return false
  }
}

export async function resetAndLogout() { 
  await AsyncStorage.clear()
  logout()
}
export function isLoggedIn() {
  return (getToken() != null && getTokenExp() != null)
}
