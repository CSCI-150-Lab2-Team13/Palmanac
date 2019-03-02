import React, { Component } from 'react';
import { AppRegistry, Button,StyleSheet,Text,View,Alert,NativeModules,TouchableOpacity,TextInput  } from 'react-native';
import { twitterLogin } from './TwitterSignIn'
import   { googleLogin } from './GoogleSignIn'
import { facebookLogin } from './FacebookSignIn'
import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as FirebaseAPI from '../firebase/FirebaseAPI'


export default class SignUp extends Component {

  constructor(props) {
    super(props)
  }
  state = {
    email: "Enter email",
    password: "Enter password",
    errorMessage: null
  };

  componentDidMount() {
    this.watchAuthState(this.props.navigation)
  }

  watchAuthState(navigation) {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('onAuthStatheChanged: ', user)
      
      if (user) {
        navigation.navigate('Main');
      }
    });
  }

  createUser() {
    FirebaseAPI.createUser( this.state.email , this.state.password)
  }

  signIn() {
    FirebaseAPI.signInUser(this.state.email, this.state.password)
  }

  render() {  
    return (
        <View>
          <Text>Sign Up</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={ (text) => this.setState({ email : text })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={ (text) => this.setState({ password :  text })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={() => this.createUser()}/>
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button title = "Sign in with Facebook"
                onPress = { facebookLogin}></Button>

        <Button title="Sign in with Twitter"
                onPress = {twitterLogin}>
               </Button>

        <Button title="Sign in with Google"
                onPress = { googleLogin } ></Button>
        

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,
    paddingTop: '50%',
  },
  textInput: {
    fontSize: 17,
    lineHeight: 24,
    width: '75%',
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    width: '75%',
    marginBottom: '10%',
    textAlign: 'center',
  },
});