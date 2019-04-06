import React, { Component } from 'react';
import { StyleSheet, Text,TextInput, View, AsyncStorage, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button } from 'native-base';


import styles from './styles'
import isEmail from "validator/lib/isEmail";
import LinearGradient from 'react-native-linear-gradient'


import {signUpToFirebase} from '../../firebase/firestoreAPI'





let password;

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      disabled: true,
      formErrors: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        loginError: ""
      }

    };

  }


  handleChange = e => {
    e.preventDefault();

    let formErrors = this.state.formErrors;
    const { name, value } = e.target;

    switch (name) {
        case "email":
            formErrors.email = isEmail(value)
                ? ""
                : "Invalid email address";
            break;
        case "password":
            formErrors.password =
                value.length < 6 ? "Minimum 6 characters required" : "";
            password = value;

            break;
        case "confirmPassword":
            formErrors.confirmPassword =
                password !== value
                    ? "Your password and confirmation password do not match"
                    : "";
            break;
        default:
            break;
    }
    this.setState({
      formErrors,
      [name]: value,
      disabled:
          formErrors.email ||
          !this.state.email ||
          (formErrors.password || !this.state.password) ||
          (formErrors.confirmPassword || !this.state.confirmPassword)
  });
};



  signUp = e => {
    e.preventDefault();
    const { email, password} = this.state;
    signUpToFirebase (email, password)
        .then(userCredential => {
            return userCredential.user
        })
        .then(async () => {
          this.props.navigation.navigate('UserName')
        })
        .catch(error => {
            this.setState(prevState => ({
                formErrors: {
                    ...prevState.formErrors,
                    loginError: error.message
                }
            }));
            console.error(this.state.formErrors.loginError);
        });
};



  render() {
    const { formErrors, disabled } = this.state;
    const { classes } = this.props;

    return (
      <KeyboardAvoidingView 
        behavior = "padding" enabled
        style={{ flex: 1 }}>

      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.container}
        colors={['#88b097', '#07416b']}>

              
      <Text style={styles.title}>Sign Up </Text>
      {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}

      <TextInput 
        placeholder = 'Email'
        autoCapitalize = 'none'
        style = {styles.textInput}
        onChangeText={(text)  => this.setState({ email: text })} 
        value = {this.state.email}
        onChange = {this.handleChange}
        />

        <TextInput
        secureTextEntry
        placeholder = 'Password'
        autoCapitalize = 'none'
        style = {styles.textInput}
        onChangeText={(text)  => this.setState({ password: text })} 
        value = {this.state.password}
        onChange = {this.handleChange}
        />
        
        <TextInput
        secureTextEntry
        placeholder = 'Confirm Password'
        autoCapitalize = 'none'
        style = {styles.textInput}
        onChangeText={(text)  => this.setState({ confirmPassword: text })} 
        value = {this.state.confirmPassword}
        onChange = {this.handleChange}
        />
        <TouchableOpacity onPress={this.signUp }>
        <View style={styles.SignUpButton}>
        <Text style={styles.Text1}> Sign Up </Text>
        </View>
        </TouchableOpacity>      
       </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

