import { startLogin, startMainApp } from "../../App";
import { Navigation } from "react-native-navigation";
import { screens } from "../../screens";
import { getIsLogged, setIsLogged } from "../storage";

// Handle login logic
export async function login() {
  setIsLogged(true);
  startMainApp();
}

// handle logout logic
export async function logout() {
  var IS_LOGGED = getIsLogged();
  console.log(IS_LOGGED);
  if (IS_LOGGED) {
    IS_LOGGED = false;
    startLogin();
  }
}
