import React, { Component } from 'react'
import { Text, View,Button, TouchableOpacity } from 'react-native'


export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text> WELCOME!!! </Text>
       <Button title= "Sign Up"
        onPress={() => this.props.navigation.navigate({ routeName: 'SignUp'})}>        
        </Button>
        <Button title= "Log In"
        onPress={() => this.props.navigation.navigate({ routeName: 'Home'})}>
        </Button>
      </View>
    )
  }
}

