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
import {createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator, StackNavigator } from 'react-navigation';

// import the different screens for different scenario's for StackNav
import LoadingScreen from './src/stacknav/LoadingScreen'
import SignUpScreen from './src/stacknav/SignUpScreen'
import WelcomeScreen from './src/stacknav/WelcomeScreen'
import HomeScreen from './src/stacknav/HomeScreen'

//import the different screens for different scenario's for tabNav
import Feed from './src/tabnav/Feed'
import Profile from './src/tabnav/Profile'
import Messages from './src/tabnav/Messages'

//import the different screens for drawNav

import Settings from './src/drawnav/SettingsScreen'

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
  render() {
    return <AppContainer />;
  }
}


const DashboardTabNavigator = createBottomTabNavigator({
  Feed,
  Profile,
  Messages,
}, 
{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: routeName
    };
  }
});

const DashboardStackNavigator = createStackNavigator ({
  DashboardTabNavigator : DashboardTabNavigator

  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        //headerLeft: <Icon name="md-menu" size={30} />
      };
    }

  }
);

const AppDrawerNavigator = createDrawerNavigator( {

  Home: {
    screen:DashboardStackNavigator
  },

  Settings: {
    screen: Settings
  },

});



const AppSwitchNavigator = createStackNavigator ({
  Home: {
    screen: AppDrawerNavigator,
  },
  Loading: {
    screen: LoadingScreen,
  },
  SignUp: {
    screen:SignUpScreen,
  },
  Welcome: {
    screen:WelcomeScreen,
  },

},
  {initialRouteName: 'Welcome'});


const AppContainer = createAppContainer(AppSwitchNavigator);


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



