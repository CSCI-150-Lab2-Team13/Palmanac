import React, { Component } from 'react'
import { Text, View,TextInput, TouchableOpacity } from 'react-native'


import firebase from '@firebase/app'

import * as FirebaseAPI from '../firebase/FirebaseAPI'




export default class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textMessage: ''
    }
  }
  
  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  sendMessage = async () => {
    if(this.state.textMessage.length > 0) {
      let msgID = 
    }


  }

  render () {
    return  (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value = {this.state.textMessage}
          placeholder= "Type message...."
          onChangeText= {this.handleChange('textMessage')}
          />
          <TouchableOpacity onPress= {this.sendMessage}>
            <Text> Send </Text>
          </TouchableOpacity>

      </View>
    )
  }



}  