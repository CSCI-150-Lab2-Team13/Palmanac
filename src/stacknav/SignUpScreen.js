import React, { Component } from 'react';
import { AppRegistry, Button,StyleSheet,Text,View,Alert,NativeModules,TouchableOpacity,  } from 'react-native';
import firebase from 'react-native-firebase'
//google

//facebook
import { LoginButton,AccessToken, LoginManager } from 'react-native-fbsdk';
// importing twitter button 
import TwitterButton, { twitterLogin } from './TwitterSignIn'
import  GoogleSign, { googleLogin } from './GoogleSignIn'
import { facebookLogin } from './FacebookSignin';


export default class SignUp extends Component {
  
  render() {  
    return (
      <View>
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


