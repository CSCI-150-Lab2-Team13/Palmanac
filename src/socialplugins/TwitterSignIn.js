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

const { RNTwitterSignIn } = NativeModules


const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "tUHUnTPpcSxbkq5FFNhKlA1f5",
  TWITTER_CONSUMER_SECRET: "atDMjsCeNXRZPBHuauZT4eRBzUVevxA1eFhv2BpIu8o6KdVXdG"
}

