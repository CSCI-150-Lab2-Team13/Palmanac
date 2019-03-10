import React, { Component } from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Body, Title, Form, Item, Input, Label, Button } from 'native-base';

import { logoutUser, createUser , signInUser} from '../firebase/firebaseAPI';

import firestore from '../firebase/firestoreAPI'
import { threadId } from 'worker_threads';



let password;

const usernameRegex = /^[a-zA-Z0-9]+$/;
class SignUp extends React.Component {

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



  async register() {
    let email = this.state.email;
    let password = this.state.password;


    createUser (email , password);
  }




  



  render() {



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
              <Input onChangeText={ (text) => this.setState({ firstName: text })} 
                     value={this.state.firstName}
              />
            </Item>
            <Item floatingLabel >
              <Label>Last Name</Label>
              <Input onChangeText={(text)  => this.setState({ lastName: text })} 
                    value = {this.state.lastName}
              />
            </Item>
            <Item floatingLabel >
              <Label>User Name</Label>
              <Input onChangeText={(text)  => this.setState({ userName: text })} 
                    value = {this.state.userName}
              />
            </Item>
            <Item floatingLabel >
              <Label>Email</Label>
              <Input onChangeText={(text)  => this.setState({ email: text })} 
                    value = {this.state.email}
              />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input onChangeText={(text)  => this.setState({ password: text })} 
                    value = {this.state.password}
              />
            </Item>
            <Button block style={styles.buttons} onPress={() => this.register() }>
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