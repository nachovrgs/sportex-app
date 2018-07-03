//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import geolib from 'geolib'

import { colors } from '../../styles';
import styles from './styles'

// create a component
export default class ExpandedEventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            coords: {},
        }
        this.loadLocation = this.loadLocation.bind(this);
        this.getDistance = this.getDistance.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        this.setState({
            item: this.props.eventItem,
            coords: {}
        })
        this.loadLocation()
        this.selectBackgroundColor()
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
        if (this._mounted && this.state.coords.longitude && this.state.item.location != null) {
            var distance = geolib.getDistance(this.state.coords,
                { latitude: this.state.item.latitude, longitude: this.state.item.longitude }
            );
            return parseFloat((distance * 0.00001).toFixed(0));
        }
    }
    selectBackgroundColor() {
        if (this._mounted) {
            var backColors = [colors.bar_rank_1, colors.bar_rank_2, colors.bar_rank_3]
            return backColors[Math.floor(Math.random() * backColors.length)];
        }
    }
    handlePress() {
        this.props.onclick()
    }
    render() {
        const event = this.state.item
        if (JSON.stringify(event) != JSON.stringify({})) {

            return (
                    <TouchableOpacity
                        onPress={() => this.handlePress()}
                        style={styles.container}>
                        <View style={styles.sidebar}>
                        </View>
                        <View style={styles.mainInfo}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {event.eventName}
                                </Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Image
                                    style={styles.eventImage}
                                    source={require('../../assets/images/time.png')} />
                                <Text style={styles.time}>
                                    {event.startingTime.split('T')[1]}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.sideInfo}>
                            <View style={styles.locationContainer}>
                                <Image
                                    style={styles.eventImage}
                                    source={require('../../assets/images/location.png')} />
                                <Text style={styles.location}>
                                    {this.getDistance()} km
                            </Text>
                            </View>
                            <View style={styles.fillContainer}>
                                <Text style={styles.fill}>
                                    {event.countStarters} / {event.maxStarters}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
            );
        }
        else {
            return null
        }
    }
}