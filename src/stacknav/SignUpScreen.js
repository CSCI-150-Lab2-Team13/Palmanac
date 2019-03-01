import React, { Component } from 'react';
import { AppRegistry, Button,StyleSheet,Text,View,Alert,NativeModules,TouchableOpacity,TextInput  } from 'react-native';
import firebase from 'react-native-firebase'
//google

//facebook
import { LoginButton,AccessToken, LoginManager } from 'react-native-fbsdk';
// importing twitter button 
import { twitterLogin } from './TwitterSignIn'
import   { googleLogin } from './GoogleSignIn'
import { facebookLogin } from './FacebookSignIn'
import FirebaseApi from './src'


export default class SignUp extends Component {

  state = { email: '', password: '', errorMessage: null}

  handleSignUp = () => {
    // To do handle firebase 
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleSignUP')
  }
  
  render() {  
    return (
      <View>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text >
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
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


