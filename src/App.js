import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: '',
      screen: 'sportex.Login',
      icon: require('./assets/images/login.png'),
      selectedIcon: require('./assets/images/login.png'),
      title: 'Login'
    },
    {
      label: '',
      screen: 'sportex.EventFeed',
      icon: require('./assets/images/events.png'),
      selectedIcon: require('./assets/images/events_s.png'),
      title: 'Partidos'
    }
  ]
});