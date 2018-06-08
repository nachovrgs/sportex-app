//import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './styles'

import { screens } from '../../screens';
// create a component
export default class CreateEvent_2 extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center',
        tabBarHidden: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            startingTime: '',
            isDateTimePickerVisible: false,
        };
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
    _handleDatePicked = (date) => {
      console.log('A date has been picked: ', date);
      this._hideDateTimePicker();
    };
    onStartTimeChanged = (startingTime) => {
        this.setState({
            startingTime: startingTime,
        });
    }
    createAction = () => {

    }
    render() {
        const { startingTime, description, isLoading } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>Show DatePicker</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.createAction}>
                        <Text style={styles.createButton} >Crear</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
