//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './styles'

// create a component
export default class CreateEvent extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        tabBarHidden: true,
    };
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
