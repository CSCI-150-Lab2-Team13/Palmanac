import React, { Component } from 'react'
import { Text, View,Button, TouchableOpacity } from 'react-native'


export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Welcome to the Home Page </Text>
       <Button title= "Home Page"
        onPress={() => this.props.navigation.navigate({ routeName: 'Home'})}>
        
        </Button>
      </View>
    )
  }
}

