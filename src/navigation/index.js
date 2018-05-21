import React, { Component } from 'react'

import { startLogin, startMainApp } from '../App'
import { screens } from '../screens'

// Handle login logic
export function login() {
  startMainApp();
}

// handle logout logic
export function logout() {
  // remove user data
  startLogin();
}
