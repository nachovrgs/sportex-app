//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import geolib from 'geolib'

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
            item: {},
            coords: {}
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

     //Helpers
     loadLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    item: this.state.item,
                    coords: position.coords
                })
            },
            error => {
                console.log(error)
            })
    }
    getDistance() {
        if(this._mounted && this.state.coords.longitude && this.state.item.location != null) {
            var distance = geolib.getDistance(this.state.coords,
                {latitude: this.state.item.latitude, longitude: this.state.item.longitude}
            );
            return parseFloat((distance * 0.00001).toFixed(0));
        }
    }

    render() {
        const event = this.state.item
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={styles.timeContainer}>
                        <Image 
                            style={styles.eventImage}
                            source={require('../../assets/images/time.png')} />
                        <Text style={styles.time}> 
                            {event.startingTime}
                        </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> 
                            {event.eventName}
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
