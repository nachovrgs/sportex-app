import { Navigation } from 'react-native-navigation';

import { AsyncStorage } from 'react-native';

import { registerScreens, screens } from './screens';

// call from index.js
async function init() {
    console.log("Initializing app")
    try {
        const token = await AsyncStorage.getItem('token');
        const tokenExp = await AsyncStorage.getItem('tokenExp');
        if (token !== null && tokenExp != null) {
            console.log("Got exisiting tokens")
            //TODO: Check token expiration
            startMainApp();
        }
        console.log("No exisiting tokens, Starting login")        
        startLogin();
    } catch (error) {
        console.log("Error retrieving data, Starting login")
        // Error retrieving data          
        startLogin();
    }
}


// For Authentication
export function startLogin() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: screens.login.id,
            title: screens.login.title,
            navigatorStyle: {},
            navigatorButtons: {}
        },
    });
}

// Main app
export function startMainApp() {
    // start the main app
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: '',
                screen: screens.userProfile.id,
                icon: require('./assets/images/profile.png'),
                selectedIcon: require('./assets/images/profile.png'),
                title: screens.userProfile.title
            },
            {
                label: '',
                screen: screens.eventFeed.id,
                icon: require('./assets/images/events.png'),
                selectedIcon: require('./assets/images/events_s.png'),
                title: screens.eventFeed.title
            },
        ],
        tabsStyle: {
            tabBarButtonColor: '#ecf0f1',
            tabBarSelectedButtonColor: '#e74c3c',
            tabBarBackgroundColor: '#2c3e50',
            initialTabIndex: 1, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
        },
        appStyle: {
            tabBarButtonColor: '#ecf0f1',
            tabBarSelectedButtonColor: '#e74c3c',
            tabBarBackgroundColor: '#2c3e50',
            initialTabIndex: 1, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
        },
        animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
}

registerScreens();
init();
