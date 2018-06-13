//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import geolib from 'geolib'

import styles from './styles'
import { logout } from '../../navigation';

// create a component
export default class EventScreen extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        tabBarHidden: true,
    };
    static navigatorButtons = {
        rightButtons: [
            {
                icon: require('../../assets/images/trash.png'),
                id: 'delete',
                buttonColor: '#ecf0f1',
                buttonFontSize: 20,
                buttonFontWeight: '600',
            }
        ]
    };
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            coords: {},
            isLoading: false,
            isError: false,
            error: "",
            token: ""
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    async componentDidMount() {
        await this.getToken()
        this._mounted = true;
        this.setState({
            item: this.props.eventItem
        })
        this.loadLocation()
    }

    // Handle nav bar navigation
    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'delete') {
                fetch(`${API_URI}/event/`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + this.state.token.replace(/"/g, "")
                    }
                }).then((response) => {
                    if (response.ok) {
                        //Event deleted, going to feed
                        this.props.navigator.push({
                            screen: screens.eventFeed.id,
                            title: screens.eventFeed.title,
                            animated: true,
                            animationType: 'fade',
                            backButtonHidden: screens.eventFeed.backButtonHidden
                        });
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            isError: true,
                            error: "Network response was not ok.",
                            token: ""
                        })
                        return new Error('Network response was not ok.');
                    }
                }).catch((error) => {
                    this.setState({
                        isLoading: false,
                        isError: true,
                        error: error.message,
                        token: ""
                    })
                    throw error;
                });
            }
        }
    }
    getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('Sportex:token')
            const tokenExp = await AsyncStorage.getItem('Sportex:tokenExp')
            if (token == null) {
                console.log("Token is null")
                logout()
            }
            this.setState({
                isLoading: false,
                isError: false,
                error: "",
                token: token
            })
        } catch (error) {
            console.log("Error getting data from storage" + error)
            this.setState({
                isLoading: false,
                isError: true,
                error: "Could not get token from store",
                token: ""
            })
            logout()
        }
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
