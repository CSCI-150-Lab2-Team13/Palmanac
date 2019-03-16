import React, { Component} from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button } from 'native-base';
import isEmail from "validator/lib/isEmail";


import { signInUser} from '../firebase/FirebaseAPI';

import firestoreAPI from '../firebase/firestoreAPI'

import { auth } from "firebase";

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disabled: true, 
      formErrors: {
        email: "",
        password: "", 
        loginError: ""
      }
    };

  } 
  

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let { formErrors } = this.state;

    switch (name) {
        case "email":
            formErrors.email = isEmail(value)
                ? ""
                : "Invalid email address";
            break;
        case "password":
            formErrors.password =
                value.length < 6 ? "Minimum 6 characters required" : "";
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
            (formErrors.password || !this.state.password)
    });
};

login = e => {
    e.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            
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



    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Log in screen</Title>
          </Body>
        </Header>
        <Content>
          <Form>
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
            <Button block style={styles.buttons} onPress={this.login}>
              <Text>Log in</Text>
            </Button>
            <Button block style={styles.buttons} onPress={() => this.props.navigation.navigate({ routeName: 'SignUp'})}>
              <Text>Register</Text>
            </Button>

            <Button block style={styles.buttons} onPress={this.loginWithGoogle}>
              <Text>Google</Text>
            </Button>
            <Button block style={styles.buttons} onPress={this.loginWithFb}>
              <Text>Facebook</Text>
            </Button>
            <Button block style={styles.buttons} onPress={this.loginWithTwitter}>
              <Text>Twitter </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  buttons: {
    margin: 10
  }
});