//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';

// create a component
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          username: '',
          password: '',
        };
    }
    
    onUsernameChanged(username) {
        this.setState({ username });
    }
    
    onPasswordChanged(password) {
        this.setState({ password });
    }

    login() {
        //TODO
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
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.loginButton} onSubmit={this.login}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
