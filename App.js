/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from "react-navigation";
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import cloudMessaging from './src/firebase/CloudMessaging';

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

async componentDidMount() {
  const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      var seen = [];
      alert(JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                  return;
              }
              seen.push(val);
          }
          return val;
      }));
  } 
  const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
          .setDescription('My apps test channel');
// Create the channel
  firebase.notifications().android.createChannel(channel);
  this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  });
  this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      notification
          .android.setChannelId('test-channel')
          .android.setSmallIcon('ic_launcher');
      firebase.notifications()
          .displayNotification(notification);
      
  });
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      var seen = [];
      alert(JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                  return;
              }
              seen.push(val);
          }
          return val;
      }));
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
      
  });
}
componentWillUnmount() {
  this.notificationDisplayedListener();
  this.notificationListener();
  this.notificationOpenedListener();
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