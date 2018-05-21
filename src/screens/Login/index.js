//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { login } from '../../navigation';

import PropTypes from 'prop-types';
import styles from './styles';

// create a component
export default class Login extends Component {
    static navigatorStyle = {
        navBarTextColor: '#ecf0f1',
        navBarBackgroundColor: '#2c3e50',
        navBarComponentAlignment: 'center'
    };
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }    
    onUsernameChanged = (username) => {
        this.setState({  
            username: username,
            password: this.state.password 
        });
    }
    
    onPasswordChanged = (password) => {
        this.setState({  
            username: this.state.username,
            password: password 
        });
    }
    loginAction = () => {
        login();
    }

    render() {
        const { username, password } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logo}
                    source={require('../../assets/images/companylogo.png')} />
                    <Text style={styles.title}>Sportex</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput 
                        placeholder="Email"
                        returnKeyType="next"
                        value={username}
                        onChangeText={this.onUsernameChanged}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}/>
                     <TextInput 
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={this.onPasswordChanged}
                        returnKeyType="go"
                        ref={(input) => this.passwordInput = input}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}/>
                    <TouchableOpacity>
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
