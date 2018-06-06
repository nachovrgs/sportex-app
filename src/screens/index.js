import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Login from './Login';
import EventFeed from './EventFeed';
import CreateEvent from './CreateEvent';
import UserProfile from './UserProfile';
import EventScreen from './EventScreen';

// Add ALL screens here for easy use all over project
export const screens = {
    login : {
        id: 'sportex.Login',
        title: 'Login',
        backButtonHidden: true
    },
    eventFeed: {
        id: 'sportex.EventFeed',
        title: 'Partidos',
        backButtonHidden: false
    },
    createEvent: {
        id: 'sportex.CreateEvent',
        title: 'Nuevo Partido',
        backButtonHidden: true
    },
    userProfile: {
        id: 'sportex.UserProfile',
        title: 'Perfil',
        backButtonHidden: false
    },
    event: {
        id: 'sportex.EventScreen',
        title: 'Partido',
        backButtonHidden: true
    }
}

// This registers all screens 
export function registerScreens() {
    Navigation.registerComponent(screens.login.id, () => Login);
    Navigation.registerComponent(screens.eventFeed.id, () => EventFeed);
    Navigation.registerComponent(screens.createEvent.id, () => CreateEvent);
    Navigation.registerComponent(screens.userProfile.id, () => UserProfile);
    Navigation.registerComponent(screens.event.id, () => EventScreen);
}