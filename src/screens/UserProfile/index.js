//import libraries
import React, { Component } from 'react'
import { View } from 'react-native'

import { resetAndLogout } from '../../helpers/storage';
import { screens } from '../../screens';

import styles from './styles'

// create a component
export default class UserProfile extends Component {
    //Navigation
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        navBarTextAlignment: 'center'
    };
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../assets/images/logout.png'),
                id: 'logout',
                buttonColor: '#ecf0f1',
                buttonFontSize: 50,
                buttonFontWeight: '900',
            }
        ]
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    // Handle nav bar navigation
    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') {
                this.props.navigator.push({
                    screen: screens.createEvent.id,
                    title: screens.createEvent.title,
                    animated: true,
                    animationType: 'fade',
                    backButtonHidden: screens.createEvent.backButtonHidden,
                });
            }
            else if (event.id == 'logout') {
                resetAndLogout()
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
