//import libraries
import React, { Component } from 'react'
import { View } from 'react-native'

import { resetAndLogout } from '../../helpers/storage';
import { screens } from '../../screens';

import { getTokenForUsage } from '../../helpers/storage';
import { API_URI } from '../../constants'
import styles from './styles'

// create a component
export default class UserProfile extends Component {
    //Navigation
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        navBarTextAlignment: 'center'
    };
    static navigatorButtons = {
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
            error: "",
            token: ""
        }  
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.loadData()
    }
    async loadData() {
        this.state.token = await getTokenForUsage()
        fetch(`${API_URI}/StandardProfile/`, {
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
                resetAndLogout()
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
