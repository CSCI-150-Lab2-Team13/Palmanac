import React, { Component } from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button } from 'native-base';

import { logoutUser, createUser , signInUser} from '../firebase/FirebaseAPI';

import { facebookLogin } from '../socialplugins/FacebookSignIn'

import * as firebase from "firebase";

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

  }


  async logIn() {
    let email = this.state.email;
    let password = this.state.password;

    signInUser (email, password)


  }

  async facebookSignIn() {
    let email = this.state.email;
    let password = this.state.password;

    facebookLogin (email, password)


  }

  register() {
    let email = this.state.email;
    let password = this.state.password;


    createUser (email , password)
  }

  logout() {

    firebase.auth().signOut().then(function () {
      console.log('Sign-out successful.');
    }).catch(function (error) {
      console.log(error);
    });
  }


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
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={ (text) => this.setState({ email: text })} 
                     value={this.state.email}
              />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input onChangeText={(text)  => this.setState({ password: text })} 
                    value = {this.state.password}
              />
            </Item>
            <Button block style={styles.buttons} onPress={() => this.logIn() }>
              <Text>Log in</Text>
            </Button>
            <Button block style={styles.buttons} onPress={() => this.register()}>
              <Text>Register</Text>
            </Button>
            <Button block style = {styles.buttons} onPress={() => this.facebookSignIn()}>
              <Text> Log in with Facebook</Text>
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