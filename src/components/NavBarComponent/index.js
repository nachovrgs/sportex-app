//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import geolib from 'geolib'

import styles from './styles'

// create a component
export default class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        }
    
    }

    componentDidMount() {
        this._mounted = true;  
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    
    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }
}
