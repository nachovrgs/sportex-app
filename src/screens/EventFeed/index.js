//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { EventContainer }  from '../../components'

import { API_URI } from '../../constants'
import PropTypes from 'prop-types';
import styles from './styles';

// create a component
export default class EventFeed extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            isLoading: true,
            isError: false,
            error: ""
        }
    }
    _renderEvent(item) {
        return <EventContainer eventItem={item.item} />
    }

    componentDidMount() {
        fetch(API_URI)
        .then((response) => {
            if(response.ok) {
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
