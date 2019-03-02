import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, AsyncStorage} from "react-native";
import { SwitchNavigator } from 'react-navigation';



class LoadingScreen extends Component {

  render() {
    return (
      <View style = {styles.container}>
        <ActivityIndicator size ="large"/>
      </View>
    );
  }
}

export default LoadingScreen;

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
