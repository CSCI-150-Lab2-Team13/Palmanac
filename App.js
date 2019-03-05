/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator , createAppContainer} from 'react-navigation';

import firebase from '@firebase/app'
import '@firebase/auth'

//importing router 

import createSwitchNavigator from './src/routing/router';

// import the different screens for different scenario's for StackNav
import SignUpScreen from './src/mainScreens/SignUpScreen'
import HomeScreen from './src/mainScreens/HomeScreen'



//import the different screens for drawNav

import Settings from './src/swipeLeftScreens/SettingsScreen'

/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Buttons
 *      - Sign Up Buttons
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - Feed
 *              - Tab 2 - Profile
 *              - Tab 3 - Messafes
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */


//import firebase and initializing 
var config = {
  apiKey: "AIzaSyCbC-n--mjbOUSWOoTbjyxQcthtV7m5xhQ",
  authDomain: "scheduleapp-boof.firebaseapp.com",
  databaseURL: "https://scheduleapp-boof.firebaseio.com",
  projectId: "scheduleapp-boof",
  storageBucket: "scheduleapp-boof.appspot.com",
  messagingSenderId: "481998559301"
};
firebase.initializeApp(config);

export default class App extends React.Component {

  render() {
    return (
      
        <AppContainer />
      
    );
  }
}

// const AppStackNavigator = createStackNavigator({
//   Login: LoginScreen,
//   Home : HomeScreen
// })

console.log(createSwitchNavigator);

const AppSwitchNavigator = createSwitchNavigator;

const AppContainer = createAppContainer(AppSwitchNavigator);


