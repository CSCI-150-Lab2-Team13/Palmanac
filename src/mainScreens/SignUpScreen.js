import React, { Component } from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button, FooterTab, Footer } from 'native-base';

import isEmail from "validator/lib/isEmail";

import firebase from '@firebase/app';
import { auth } from "firebase";

import 'firebase/firebase-firestore'


import firestoreAPI from '../firebase/firestoreAPI'




let password;

const usernameRegex = /^[a-zA-Z0-9]+$/;
export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      disabled: true,
      formErrors: {
        userName: "",
        email: "",
        password: "",
        confPassword: "",
        loginError: ""
      }

    };

  }


  handleChange = e => {
    e.preventDefault();

    let formErrors = this.state.formErrors;
    const { name, value } = e.target;

    switch (name) {
        case "userName":
            formErrors.userName =
                usernameRegex.test(value) && value.length >= 3
                    ? ""
                    : "Minimum 3 characters required. Allowed only letters and numbers";
            break;
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
        case "confPassword":
            formErrors.confPassword =
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
          (formErrors.userName || !this.state.userName) ||
          (formErrors.confPassword || !this.state.confPassword)
  });
};



  signUp = e => {
    e.preventDefault();
    const { email, password, userName } = this.state;
     auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            return userCredential.user
        })
        .then(user => {
            const newUser = {
                id: user.uid,
                userName: userName,
                email: user.email,
                gender: "",
                age: 0,
                photoUrl: "",
                isNewUser: true
            };
            //adding user to DB
            firestoreAPI.addUser(newUser);
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
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Sign Up Screen</Title>
          </Body>
        </Header>
        <Content>
          <Form>
         <Item floatingLabel>
              <Label>First Name</Label>
              <Input  onChangeText={(text)  => this.setState({ firstName: text })} 
                      value = {this.state.firstName}
                      onChange = {this.handleChange} 
              />
            </Item>
            <Item floatingLabel >
              <Label>Last Name</Label>
              <Input  onChangeText={(text)  => this.setState({ lastName: text })} 
                      value = {this.state.lastName}
                      onChange = {this.handleChange} 
              />
            </Item>
            <Item floatingLabel >
              <Label>User Name</Label>
              <Input  onChangeText={(text)  => this.setState({ userName: text })} 
                      value = {this.state.userName}
                      onChange = {this.handleChange} 
              />
            </Item>
            <Item floatingLabel >
              <Label>Email</Label>
              <Input  onChangeText={(text)  => this.setState({ email: text })} 
                      value = {this.state.email}
                      onChange = {this.handleChange} 
              />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input  onChangeText={(text)  => this.setState({ password: text })} 
                      value = {this.state.password}
                      onChange = {this.handleChange} 
              />
            </Item>
            <Item floatingLabel >
              <Label>Confirm Password</Label>
              <Input  onChangeText={(text)  => this.setState({ confirmPassword: text })} 
                      value = {this.state.confirmPassword}
                      onChange = {this.handleChange} 
              />
            </Item>

          <View style = {styles.bottom}>
          <Footer>
          <FooterTab>
          <Button block style={styles.buttons} onPress = {this.signUp}>
          <Text style = {{color: 'white'}}>Register</Text>
            </Button>
          </FooterTab>
          </Footer>
          </View>


          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#140A25",
    flex: 1
  },

  bottomButton: {
    position: 'absolute',
    bottom: 0
    //margin: 10
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20
    //paddingBottom: 0
  }
});