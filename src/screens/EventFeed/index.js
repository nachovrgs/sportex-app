//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';

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
        ]
    };
    _keyExtractor = (item, index) => item.id.toString();

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            isError: false,
            error: "",
            token: ""
        }        
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    // Handle nav bar navigation
    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') {
                this.props.navigator.push({
                    screen: screens.createEvent1.id,
                    title: screens.createEvent1.title,
                    animated: true,
                    animationType: 'fade',
                    backButtonHidden: screens.createEvent1.backButtonHidden,
                });
            }
        }
    }
    _renderItem = ({item}) => (
       <EventContainer eventItem={item} navigator={this.props.navigator} />  
    )

    async componentDidMount() {
        await this.getToken()
        fetch(`${API_URI}/event/`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + this.state.token.replace(/"/g,""),
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
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
            })
            .then((jsonResponse) => {
                this.setState({
                    dataSource: jsonResponse,
                    isLoading: false,
                    error: "",
                    token: ""
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    isError: true,
                    error: error.message,
                    token: ""
                })
                throw error;
            });
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
                    this.state.dataSource.length == 0
                        ?
                        <View style={styles.container}>
                            <Text>No hay eventos</Text>
                        </View>
                        :
                        <View style={styles.container}>
                            <FlatList
                                style={styles.eventList}
                                data={this.state.dataSource}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                            />
                        </View>
        );
    }
}
