//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './styles'

// create a component
export default class EventScreen extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        tabBarHidden: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }
    
    componentDidMount() {
        this._mounted = true;
        this.setState({
            item: this.props.eventItem
        })
        this.loadLocation()        
    }
    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={styles.timeContainer}>
                        <Image 
                            style={styles.eventImage}
                            source={require('../../assets/images/time.png')} />
                        <Text style={styles.time}> 
                            {event.time}
                        </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> 
                            {event.name}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Image 
                            style={styles.eventImage}
                            source={require('../../assets/images/location.png')} />
                        <Text style={styles.title}> 
                            {this.getDistance()} km
                        </Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> 
                            {event.description}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
