import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Login from './Login';
import EventFeed from './EventFeed';
import CreateEvent_1 from './CreateEvent_1';
import CreateEvent_2 from './CreateEvent_2';
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
    createEvent1: {
        id: 'sportex.CreateEvent_1',
        title: 'Crear Partido',
        backButtonHidden: true
    },
    createEvent2: {
        id: 'sportex.CreateEvent_2',
        title: 'Cuando es?',
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
    Navigation.registerComponent(screens.createEvent1.id, () => CreateEvent_1);
    Navigation.registerComponent(screens.createEvent2.id, () => CreateEvent_2);
    Navigation.registerComponent(screens.userProfile.id, () => UserProfile);
    Navigation.registerComponent(screens.event.id, () => EventScreen);
}