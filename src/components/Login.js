import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, Dimensions } from 'react-native';


const { width: WIDTH } = Dimensions.get('window')
export default class Login extends Component {
    render() {
        return (
          <View>
              <TextInput 
                style = {styles.input}
                placeholder = {'Username'}
                placeholderTextColor = {'rgba(255,255,0.7)'} 
                underlineColorAndroid = 'transparent'
                />
          </View>
        );
      }
  }

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

  input: {
      width: WIDTH,

  }
});
