/* //import libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import styles from './styles'

import { Button } from 'react-native-elements'
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
            startingDate: null,
            startingTime: null,
            isDateTimePickerVisible: false,
            isTimePickerVisible: false,
            name: this.props.name,
            description: this.props.description
        };
    }
    //Date
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({
            startingDate: date,
            startingTime: this.state.startingTime,
        });
        this._hideDateTimePicker();
    };
    //Time
    _showTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        this.setState({
            startingDate: this.state.startingDate,
            startingTime: time,
        });
        this._hideTimePicker();
    };

    isReady = () => {
        return this.state.startingDate && this.state.startingTime && this.state.startingDate != '' && this.state.startingTime != ''
    }

    nextAction = () => {
        this.props.navigator.push({
            screen: screens.createEvent3.id,
            title: screens.createEvent3.title,
            animated: true,
            animationType: 'fade',
            backButtonHidden: screens.createEvent3.backButtonHidden,
            passProps: {
                name: this.state.name,
                description: this.state.description,
                date: this.cleanDate(this.state.startingDate),
                time: this.cleanTime(this.state.startingTime)
            },
        });
    }

    cleanDate = (date) => {
        if (date) {
            var day = String(date.getDate()).length == 1 ? "0" + date.getDate() : date.getDate();
            var month = String(date.getMonth()).length == 1 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var year = date.getFullYear();
            return year + "-" + month + "-" + day;
        }
    }

    cleanTime = (time) => {
        if (time) {
            var hour = String(time.getHours()).length == 1 ? "0" + time.getHours() : time.getHours();
            var minute = String(time.getMinutes()).length == 1 ? "0" + time.getMinutes() : time.getMinutes();
            var second = String(time.getSeconds()).length == 1 ? "0" + time.getSeconds() : time.getSeconds();
            return hour + ':' + minute + ':' + second;
        }
    }

    render() {
        const { startingTime, description, isLoading } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.selectorContainer}>
                        <TouchableOpacity onPress={this._showDateTimePicker}>
                            <Image
                                style={styles.calendarIcon}
                                source={require('../../assets/images/calendar.png')} />
                            <Text style={styles.dateTimeText}>
                                {this.cleanDate(this.state.startingDate)}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            minimumDate={new Date()}
                            // maximumDate={new Date().setMonth((new Date().getMonth()+1))}
                        />
                    </View>
                    <View style={styles.selectorContainer}>
                        <TouchableOpacity onPress={this._showTimePicker}>
                            <Image
                                style={styles.calendarIcon}
                                source={require('../../assets/images/time.png')} />
                            <Text style={styles.dateTimeText}>
                                {this.cleanTime(this.state.startingTime)}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                            minimumDate={new Date()}
                            mode="time"
                        />
                    </View>
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
 */