import { startLogin, startMainApp } from "../../App";
import { Navigation } from "react-native-navigation";
import { screens } from "../../screens";

var IS_LOGGED = false;
// Handle login logic
export async function login() {
  IS_LOGGED = true;
  startMainApp();
}

// handle logout logic
export async function logout() {
  if (IS_LOGGED) {
    IS_LOGGED = false;
    startLogin();
  }
}
