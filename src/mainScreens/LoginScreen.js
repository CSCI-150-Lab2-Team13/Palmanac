import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, AsyncStorage,Image,KeyboardAvoidingView } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title, Form, Item, Input, Label, Button, StyleProvider, getTheme } from 'native-base';
import isEmail from "validator/lib/isEmail";
import Icon from 'react-native-vector-icons/FontAwesome';




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
      <Container style={{backgroundColor: "#140A25", flex: 1}}>
      <Header transparent >
          <Title style = {styles.textColor}>PALMANAC</Title>
      </Header>
      <Content padder>
          <Form>
          <View style={{
        marginTop: 115,
        alignItems: 'stretch'
        }}>

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
          </View>




            <Button iconLeft block style = {styles.buttonLogin} onPress={this.login}>
              <Text style = {styles.buttonText}>Log in</Text>
              <Icon name="sign-in" size={30} color="white" />
            </Button>

            <Button iconLeft block style={styles.buttonRegister} onPress={() => this.props.navigation.navigate({ routeName: 'SignUp'})}>
              <Text style = {styles.buttonText}>Register</Text>
              <Icon name="angle-double-right" size={30} color="white"  /> 
              
            </Button>


            
        <Title style = {{marginBottom: 5, marginTop: 5, fontSize: 15, fontFamily: 'sans-serif', color: "#6CF0E5"}}>- Sign In Options -</Title>

            <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        justifyContent: "space-evenly",
        alignItems: 'stretch',
        alignItems: "center"
        }}>

            <Button block style={styles.buttonGoogle} onPress={this.loginWithGoogle}>
            <Icon name="google" size={30} color="white" />
            </Button>

            <Button block style={styles.buttonFacebook} onPress={this.loginWithFb}>
            <Icon name="facebook" size={30} color="white" />
            </Button>
            
            <Button block style={styles.buttonTwitter} onPress={this.loginWithTwitter}>
            <Icon name="twitter" size={30} color="white" />
            </Button>

          </View>
          </Form>
        </Content>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  buttonLogin: {
    //alignItems: "stretch",
    backgroundColor: '#31447D',
    borderRadius: 40,
    flexDirection: "column",
    height: 75,
    marginTop: 30,
    alignItems : "center",
    //justifyContent: "center"
    //flex: 1, 
    //backgroundColor: 'yellow'
  },
  buttonRegister: {
    borderRadius: 40,
    backgroundColor: '#2B3763',
    flexDirection: "column",
    height: 75,
    marginTop: 5,
    alignItems: "center"
  },


  buttonGoogle: {
    backgroundColor: '#260A67',
    borderRadius: 360,
    flexDirection: "row",
    height: 70,
    width: 100,
    marginTop: 4
   // alignItems: "stretch"
  },

  buttonFacebook: {
    backgroundColor: '#260A67',
    borderRadius: 360,
    flexDirection: "row",
    height: 70,
    width: 100,
    marginTop: 4,
    //alignItems: "baseline"
  },

  buttonTwitter: {
    backgroundColor: '#260A67',
    borderRadius: 360,
    flexDirection: "row",
    height: 70,
    width: 100,
    marginTop: 4,
    //alignItems: "stretch"
  },

  buttonContainer: {
    //backgroundColor: '#9966cc',
    //borderRadius: 25,
    //flexDirection: 'column',
    overflow: 'hidden',
    paddingVertical: 15,
    marginBottom: 12,
    flexDirection: "column",
    alignItems: "stretch",
    height: 70
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  /*
  buttonAlignment: {
    flexDirection: 'column',
    
  },
*/
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
    //paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 5
  }
});