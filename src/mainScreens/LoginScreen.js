import React, { Component } from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button } from 'native-base';


import firebase from '@firebase/app';
import '@firebase/auth'
import 'firebase/firebase-firestore'
import { signInUser} from '../firebase/firebaseAPI';




export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.state = {
      email: "",
      password: "",
    }

  }
  

  async logIn() {
    let email = this.state.email;
    let password = this.state.password;

    signInUser (email, password)
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
            <Item floatingLabel >
              <Label>Email</Label>
              <Input onChangeText={(text)  => this.setState({ Email: text })} 
                    value = {this.state.email}
              />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input onChangeText={(text)  => this.setState({ password: text })} 
                    value = {this.state.password}
              />
            </Item>
            <Button block style={styles.buttons} onPress={() => this.logIn()}>
              <Text>Log in</Text>
            </Button>
            <Button block style={styles.buttons} onPress={() => this.props.navigation.navigate({ routeName: 'SignUp'})}>
              <Text>Register</Text>
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