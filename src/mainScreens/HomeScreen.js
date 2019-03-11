import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import { Container, Header, Content, Body, Title, Form, Item, Input, Label} from 'native-base';
import firebase from '@firebase/app'

import '@firebase/auth'



import * as firebaseAPI from '../firebase/firebaseAPI'


let isMounted; 

export default class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      user: "loading",

    }

  } 

  componentDidMount() {
    isMounted = true;
    console.log('mounted2 ' + isMounted);

    firebase.auth().onAuthStateChanged((user) => {
      if(!isMounted) return;
      
      if (user) {

        this.setState({ user: user.email });
      } else {
        this.setState({ user: null });
      }
    });
  }


  componentWillUnmount() {
    isMounted = false;
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
            <Title>Home screen</Title>
          </Body>
        </Header>
        <Content>

          <Text>User is {this.state.user}</Text>
          <Button block danger last onPress={() => this.logout()}>
            <Text>Logout</Text>
          </Button>

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