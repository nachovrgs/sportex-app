//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import geolib from 'geolib'

import styles from './styles'

// create a component
export default class EventContainer extends Component {
    constructor() {
        super();
        this.state = {
            item: {},
            coords: {}
        }
        this.loadLocation = this.loadLocation.bind(this);
        this.getDistance = this.getDistance.bind(this);
    
    }

    componentDidMount() {
        this._mounted = true;
        this.setState({
            item: this.props.eventItem,
            coords: {}
        })
        this.loadLocation()        
    }
    componentWillUnmount() {
        this._mounted = false;
    }
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
        if(this._mounted && this.state.coords.longitude) {
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
