//import libraries
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import { EventContainer } from '../../components'

import { screens } from '../../screens'

import { getTokenForUsage } from '../../helpers/storage';
import { API_URI } from '../../constants'
import styles from './styles';
import { colors } from '../../styles';

// create a component
export default class Groups extends Component {
    //Navigation
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: colors.navbar,
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
        this.loadData()
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
    _renderItem = ({ item }) => (
        <GroupContainer groupItem={item} navigator={this.props.navigator} />
    )

    async loadData() {
        this.state.token = await getTokenForUsage()
        fetch(`${API_URI}/group/`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + this.state.token.replace(/"/g, ""),
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
                console.log(jsonResponse)
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
                            <View style={styles.noData}>
                                <Text style={styles.noDataText}>No hay grupos, crea alguno!</Text>
                            </View>
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
