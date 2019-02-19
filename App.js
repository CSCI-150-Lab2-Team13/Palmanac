/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from "react";
import {Platform, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// import the different screens for different scenario's
import LoadingScreen from './src/components/LoadingScreen'
import SignUpScreen from './src/components/SignUpScreen'
import LoginScreen from './src/components/LoginScreen'
import WelcomeScreen from './src/components/WelcomeScreen'
import HomeScreen from './src/components/HomeScreen'

const AuthStackNavigator = createStackNavigator ({
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
})
export default createSwitchNavigator ({
  Loading: LoadingScreen,
  Auth: AuthStackNavigator
})



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



