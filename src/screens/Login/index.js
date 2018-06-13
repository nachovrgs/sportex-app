//import libraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import { login } from '../../navigation';

import { screens } from '../../screens';
import { API_URI } from '../../constants'
import PropTypes from 'prop-types';
import styles from './styles';

// create a component
export default class Login extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center'
    };
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false
        };
    }
    onUsernameChanged = (username) => {
        this.setState({
            username: username,
            password: this.state.password,
            isLoading: false
        });
    }

    onPasswordChanged = (password) => {
        this.setState({
            username: this.state.username,
            password: password,
            isLoading: false
        });
    }
    resetValues = () => {
        console.log("Error logging in")
        this.setState({
            username: "",
            password: "",
            isLoading: false
        })
        return new Error('Network response was not ok.');
    }
    loginAction = async () => {
        this.setState({
            username: this.state.username,
            password: this.state.password,
            isLoading: true
        })
        fetch(`${API_URI}/auth/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: "ignacio",//this.state.username,
                Password: "1234"//this.state.password,
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                this.resetValues()
            }
        })
            .then((jsonResponse) => {
                this.storeTokenAndLogin(jsonResponse)
            })
            .catch((error) => {
                this.resetValues()
            });
    }
    storeTokenAndLogin = async (response) => {
        try {
            await AsyncStorage.setItem('Sportex:token', JSON.stringify(response.token))
            await AsyncStorage.setItem('Sportex:tokenExp', JSON.stringify(response.expires))
            login()
        } catch (error) {
            console.log("Error saving data in storage" + error)
            this.resetValues()
        }
    }
    registerAction = () => {
        this.props.navigator.push({
            screen: screens.register.id,
            title: screens.register.title,
            animated: true,
            animationType: 'fade',
            backButtonHidden: screens.register.backButtonHidden
        });
    }
    render() {
        const { username, password, isLoading } = this.state;
        return (
            isLoading
                ?
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/companylogo.png')} />
                        <Text style={styles.title}>Sportex</Text>
                    </View>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#ecf0f1" animating />
                    </View>
                </View>
                :
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/companylogo.png')} />
                        <Text style={styles.title}>Sportex</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            placeholder="Username"
                            returnKeyType="next"
                            value={username}
                            onChangeText={this.onUsernameChanged}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input} />
                        <TextInput
                            placeholder="Contraseña"
                            secureTextEntry
                            value={password}
                            onChangeText={this.onPasswordChanged}
                            returnKeyType="go"
                            ref={(input) => this.passwordInput = input}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input} />
                        <TouchableOpacity onPress={this.registerAction}>
                            <Text style={styles.register}>
                                Registrate
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.loginAction}>
                            <Text style={styles.loginButton} >Ingresar</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
        );
    }
}
