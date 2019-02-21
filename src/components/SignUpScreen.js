import React, { Component } from 'react';
import { AppRegistry, Button,StyleSheet,Text,View,Alert,NativeModules,TouchableOpacity  } from 'react-native';
import firebase from 'react-native-firebase'
//google
import { GoogleSignin, GoogleSigninButton, statusCodes  } from 'react-native-google-signin';
//facebook
import { LoginButton,AccessToken, LoginManager } from 'react-native-fbsdk';
// importing twitter button 
import TwitterButton from './TwitterButton'


export default class SignUp extends Component {

  componentDidMount() {
    GoogleSignin.configure({
      androidClientId: '106823834577-oa56hftvr714h6avalhupjon5lps3lcd.apps.googleusercontent.com', // only for android
        forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });

    googleSignInHandler = () => {
      GoogleSignin.hasPlayServices()
      .then(res => {
          GoogleSignin.signIn()
          .then(res => {
              console.log(res);
          })
          .catch(err => {
              console.log(error.code);
          });
      })
      .catch(err => {
          console.log(err);
      });
  }
  
  }

  render() {
    
    return (
      <View>
      <LoginButton
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  console.log(data.accessToken.toString())
                }
              )
            }
          }
        }
        onLogoutFinished={() => console.log("logout.")}/>
         <TwitterButton></TwitterButton>

         <GoogleSigninButton
           style={{ width: 192, height: 48 }}
           size={GoogleSigninButton.Size.Wide}
           color={GoogleSigninButton.Color.Dark}
           onPress={this.googleSignInHandler}
           
            />

        </View>
    );
  }
}


