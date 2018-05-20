import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Login from './Login';
import EventFeed from './EventFeed';

export function registerScreens() {
    Navigation.registerComponent('sportex.Login', () => Login);
    Navigation.registerComponent('sportex.EventFeed', () => EventFeed);
}