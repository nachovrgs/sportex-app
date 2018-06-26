import { startLogin, startMainApp } from '../../App'

// Handle login logic
export function login() {
  startMainApp();
}

// handle logout logic
export function logout() {
  // remove user data
  startLogin();
}
