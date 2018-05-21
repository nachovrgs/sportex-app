//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { EventContainer } from '../../components'

import { screens } from '../../screens';

import { logout } from '../../navigation';

import { API_URI } from '../../constants'
import PropTypes from 'prop-types';
import styles from './styles';

// create a component
export default class EventFeed extends Component {
    //Navigation
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        navBarTextAlignment: 'center'
    };
    static navigatorButtons = {
        rightButtons: [
            {
                icon: require('../../assets/images/add.png'),
                id: 'add',
                buttonColor: '#ecf0f1',
                buttonFontSize: 20,
                buttonFontWeight: '600',
            }
        ],
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
        this.state = {
            dataSource: [],
            isLoading: true,
            isError: false,
            error: ""
        }
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
                logout();
            }
        }
    }
    _renderEvent(item) {
        return <EventContainer eventItem={item.item} />
    }

    componentDidMount() {
        fetch(API_URI)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    this.setState({
                        isLoading: false,
                        isError: true,
                        error: "Network response was not ok."
                    })
                    return new Error('Network response was not ok.');
                }
            })
            .then((jsonResponse) => {
                this.setState({
                    dataSource: jsonResponse,
                    isLoading: false,
                    error: ""
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    isError: true,
                    error: error.message
                })
                throw error;
            });
    }

    render() {
        return (
            this.state.isLoading
                ?
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#ecf0f1" animating />
                </View>
                :
                this.state.isError
                    ?
                    <View style={styles.container}>
                        <Text>{this.state.error}</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        <FlatList
                            style={styles.eventList}
                            data={this.state.dataSource}
                            keyExtractor={item => item._id}
                            renderItem={item => this._renderEvent(item)}
                        />
                    </View>
        );
    }
}
