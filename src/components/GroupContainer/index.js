//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import geolib from 'geolib'

import { screens } from '../../screens'
import { navigate } from '../../helpers/navigation';

import styles from './styles'

// create a component
class GroupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            coords: {}
        }
        this.loadLocation = this.loadLocation.bind(this);
        this.getDistance = this.getDistance.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        this.setState({
            item: this.props.groupItem,
            coords: {}
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

    handlePress() {
        this.props.navigator.push({
            screen: screens.event.id,
            title: screens.event.title,
            animated: true,
            animationType: 'fade',
            backButtonHidden: screens.event.backButtonHidden,
            passProps: {
                eventItem: this.state.item
            },
      });
    }
    render() {
        const event = this.state.item
        if(JSON.stringify(event) != JSON.stringify({})) {
            
            return (
                <TouchableOpacity 
                onPress={ () => this.handlePress() }
                style={styles.container}>
                    <View style={styles.head}>
                        <View style={styles.timeContainer}>
                            <Image 
                                style={styles.eventImage}
                                source={require('../../assets/images/time.png')} />
                            <Text style={styles.time}> 
                                {event.startingTime.split('T')[1]}
                            </Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}> 
                                {event.eventName}
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
                </TouchableOpacity>
            );
        }
        else {
            return null
        }
    }
}
export default GroupContainer;