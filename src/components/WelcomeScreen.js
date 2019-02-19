import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class WelcomeScreen extends Component {
  render() {
    return (
      <View> style = { StyleSheet.container}>
        <Text> WelcomeScreen </Text>
      </View>
    );
  }
}

export default WelcomeScreen;

const style = StyleSheet.create ({
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
