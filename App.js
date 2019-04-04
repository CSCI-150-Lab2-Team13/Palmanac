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
import {createAppContainer} from "react-navigation";
import config from '../Palmanac/src/firebase/fireConfig'
import firebase from 'react-native-firebase'


//importing router 


import createSwitchNavigator from './src/routing/router';




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


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
   
}
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