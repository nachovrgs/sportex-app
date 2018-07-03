//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import geolib from 'geolib'

import { EventCard, ExpandedEventCard } from '../../components'
import { screens } from '../../screens'
import { navigate } from '../../helpers/navigation';

import { colors } from '../../styles';
import styles from './styles'

// create a component
class EventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            coords: {},
            expanded: false
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
        this.state.expanded = !this.state.expanded
        this.forceUpdate()
    }

    render() {
        if (JSON.stringify(this.state.item) != JSON.stringify({})) {
            return (
                this.state.expanded
                    ?
                    <ExpandedEventCard eventItem={this.state.item} navigator={this.props.navigator} onclick={this.handlePress} />
                    :
                    <EventCard eventItem={this.state.item} navigator={this.props.navigator} onclick={this.handlePress} />
            );
        }
        else {
            return null
        }
    }
}
export default EventContainer;