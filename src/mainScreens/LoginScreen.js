import React, { Component, PropTypes } from 'react';

import { StyleSheet, Text, View, AsyncStorage,Image,KeyboardAvoidingView } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title, Form, Item, Input, Icon, Label, Button, StyleProvider, getTheme } from 'native-base';
import isEmail from "validator/lib/isEmail";



import firebase from '@firebase/app';
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
      <Container style={{backgroundColor: "#002366", flex: 1}}>
      <Header transparent >
          <Title style = {styles.textColor}>PALMANAC</Title>
      </Header>
      <Content padder>
          <Form>
          <Item floatingLabel>
              <Label style = {{color:'#c7ecee', marginTop: -13, paddingHorizontal: 5}}>Email</Label>
              <Input 
              keyboardType = "email-address" 
              autoCorrect = {false} 
              autoCapitalize = "none" 
              //returnKeyType = "Next" 
              style = {styles.input}  
              onChangeText={(text)  => this.setState({ email: text })} 
                      value = {this.state.email}
                      onChange = {this.handleChange} 
              />
            </Item>
            <Item floatingLabel>
              <Label style = {{color:'#c7ecee', marginTop: -13, paddingHorizontal: 5}}>Password</Label>
              <Input 
              secureTextEntry 
              //returnKeyType = "GO" 
              style = {styles.input} 
              onChangeText={(text)  => this.setState({ password: text })} 
                      value = {this.state.password}
                      onChange = {this.handleChange} 
              />
            </Item>

            <Content padder>
            </Content>
            
            <Button block style={styles.buttonContainer} onPress={this.login}>
              <Icon active name="wifi" />
              <Text style = {styles.buttonText}>Log in</Text>
            </Button>
            <Button block style={styles.buttonContainer} onPress={() => this.props.navigation.navigate({ routeName: 'SignUp'})}>
              <Text style = {styles.buttonText}>Register</Text>
            </Button>

            <Button block style={styles.buttonContainer} onPress={this.loginWithGoogle}>
              <Text style = {styles.buttonText}>Google</Text>
            </Button>
            <Button block style={styles.buttonContainer} onPress={this.loginWithFb}>
              <Text style = {styles.buttonText}>Facebook</Text>
            </Button>
            <Button block style={styles.buttonContainer} onPress={this.loginWithTwitter}>
              <Text style = {styles.buttonText}>Twitter </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  buttonContainer: {
    //backgroundColor: '#9966cc',
    borderRadius: 25,
    //flexDirection: 'column',
    overflow: 'hidden',
    paddingVertical: 15,
    marginBottom: 10
    //height: 60
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },

  textColor: {
    color: '#32CD32',
    fontFamily: "Octicons",
    fontSize: 15,
    fontWeight: 'bold'
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    //marginBottom: 36,
    position: 'absolute'
  },

  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5
  }
});