import React, { Component } from "react"
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity } from "react-native"

import firebase from 'react-native-firebase';

const { RNTwitterSignIn } = NativeModules
const { TwitterAuthProvider } = firebase.auth;

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "tUHUnTPpcSxbkq5FFNhKlA1f5",
  TWITTER_CONSUMER_SECRET: "atDMjsCeNXRZPBHuauZT4eRBzUVevxA1eFhv2BpIu8o6KdVXdG"
}


export async function twitterLogin() {
  try {
    await RNTwitterSignIn.init(Constants.TWITTER_CONSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);

    // also includes: name, userID & userName
    const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();    

    const credential = TwitterAuthProvider.credential(authToken, authTokenSecret);

    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.error(e);
  }
}