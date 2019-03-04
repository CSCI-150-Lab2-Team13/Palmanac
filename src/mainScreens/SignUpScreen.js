import React, { Component } from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button } from 'native-base';

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

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (res) => {

        // console.log(res);
        // await AsyncStorage.setItem(res.accessToken);
        // this.props.navigation.navigate('App');
        // this.props.navigation.navigate('Home');
      })
      .catch(function (error) {
        // Handle Errors here.
        // Handle Errors here.
        console.log(error.message);
        // ...
      });



  }

  register() {
    let email = this.state.email;
    let password = this.state.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      console.log(error.message);


    });

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
              <Input onChangeText={email => this.setState({ email: email })} />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input onChangeText={password => this.setState({ password: password })} />
            </Item>
            <Button block style={styles.buttons} onPress={() => this.logIn()}>
              <Text>Log in</Text>
            </Button>
            <Button block style={styles.buttons} onPress={() => this.register()}>
              <Text>Register</Text>
            </Button>
            <Text>User is {this.state.user}</Text>

            <Button block danger last style={styles.buttons} onPress={() => this.logout()}>
              <Text>Logout</Text>
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