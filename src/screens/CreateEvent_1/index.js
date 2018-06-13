//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'

import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screens } from '../../screens';
import styles from './styles'
import { colors } from '../../styles';

// create a component
export default class CreateEvent_1 extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        tabBarHidden: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
    }
    onNameChanged = (name) => {
        this.setState({
            name: name
        });
    }
    onDescriptionChanged = (description) => {
        this.setState({
            description: description
        });
    }
    isReady = () => {
        return this.state.name && this.state.description && this.state.name != '' && this.state.description != ''
    }
    nextAction = () => {
        this.props.navigator.push({
            screen: screens.createEvent2.id,
            title: screens.createEvent2.title,
            animated: true,
            animationType: 'fade',
            backButtonHidden: screens.createEvent2.backButtonHidden,
            passProps: {
                name: this.state.name,
                description: this.state.description
            },
        });
    }
    render() {
        const { name, description, isLoading } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Nombre"
                        returnKeyType="next"
                        value={name}
                        onChangeText={this.onNameChanged}
                        onSubmitEditing={() => this.descriptionInput.focus()}
                        autoCorrect={true}
                        placeholderTextColor="rgba(0,0,255,0.7)"
                        style={styles.input} />
                    <TextInput
                        placeholder="Descripcion"
                        value={description}
                        autoCorrect={true}
                        onChangeText={this.onDescriptionChanged}
                        returnKeyType="go"
                        ref={(input) => this.descriptionInput = input}
                        placeholderTextColor="rgba(0,0,255,0.7)"
                        style={styles.input} />


                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title='Siguiente'
                        onPress={this.nextAction}
                        disabled={!this.isReady()}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}
