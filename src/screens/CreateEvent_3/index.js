//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import { CheckBox, Slider, Button } from 'react-native-elements'
import styles from './styles'

import { logout } from '../../helpers/navigation';
import { API_URI } from '../../constants'
import { screens } from '../../screens';

// create a component
export default class CreateEvent_3 extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        tabBarHidden: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            name: this.props.name,
            description: this.props.description,
            date: this.props.date,
            time: this.props.time,
            locations: [{
                ID: 1,
                Name: "Scuola",
                CreatedOn: "2018-06-04 00:00:00",
                Description: "Carrasco - Scuola",
                LastUpdate: "2018-06-04 00:00:00",
                Status: 1

            }],
            isPublic: false,
            maxStarters: 15,
            maxSubs: 5,
            token: "",
            isLoading: true,
            isError: false,
            error: "",
        };
    }
    async componentDidMount() {
        await this.getToken()
        /* fetch(`${API_URI}/location/`).then(res => res.json()).then((locations) => {
            this.setState({ locations: locations });
        }); */
    }

    createAction = () => {
        fetch(`${API_URI}/event/`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + this.state.token.replace(/"/g, ""),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                StandardProfileID: 1,
                EventName: this.state.name,
                Description: this.state.description,
                EventType: 1,
                StartingTime: this.state.date + "T" + this.state.time,
                LocationID: 1,
                IsPublic: this.state.isPublic ? 1 : 0,
                MaxStarters: this.state.maxStarters,
                MasSubs: this.state.maxSubs
            })
        }).then((response) => {
            if (response.ok) {
                //Event created,oing to feed
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

    isReady = () => {
        return true
    }

    findLocation = (query) => {
        console.log("This is the query: " + query)
        if (!query || query === '') {
            return [];
        }
        const { locations } = this.state.locations;
        console.log("This are the locations: " + locations)
        const regex = new RegExp(`${query.trim()}`, 'i');
        return locations.filter(location => location.Name.search(regex) >= 0);
    }

    render() {
        /* const { query } = this.state.query;
        const locations = this.findLocation(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim(); */
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
                        <View style={styles.formContainer}>
                            <CheckBox
                                center
                                title='Evento Public'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.isPublic}
                                onPress={() => this.setState({ isPublic: !this.state.isPublic })}
                            />
                            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                                <Slider
                                    value={this.state.maxStarters}
                                    onValueChange={(value) => this.setState({ maxStarters: value })}
                                    step={1}
                                    maximumValue={20}
                                    minimumValue={10} />
                                <Text>Value: {this.state.maxStarters}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                                <Slider
                                    value={this.state.maxSubs}
                                    onValueChange={(value) => this.setState({ maxSubs: value })}
                                    step={1}
                                    maximumValue={20}
                                    minimumValue={0} />
                                <Text>Value: {this.state.maxSubs}</Text>
                            </View>

                            {/*  <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={locations.length === 1 && comp(query, locations[0].title) ? [] : locations}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Busca una cancha"
                    renderItem={({ title, release_date }) => (
                        <TouchableOpacity onPress={() => this.setState({ query: title })}>
                            <Text style={styles.itemText}>
                                {title} ({release_date.split('-')[0]})
                  </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.descriptionContainer}>
                    {locations.length > 0 ? (
                        AutocompleteExample.renderFilm(locations[0])
                    ) : (
                            <Text style={styles.infoText}>
                                Busca una cancha
                </Text>
                        )}
                </View> */}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                large
                                title='Crear'
                                onPress={this.createAction}
                                disabled={!this.isReady()}
                            />
                        </View>
                    </View>
        );
    }
}