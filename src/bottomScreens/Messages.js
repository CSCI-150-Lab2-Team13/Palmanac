import React, { Component } from 'react'
import { Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Button,
  TextInput
 } from 'react-native'

import firebase from 'react-native-firebase'
import firestoreAPI from '../firebase/firestoreAPI'
 import { GiftedChat } from 'react-native-gifted-chat'
//import console = require('console');




export default class Messages extends Component {

  constructor(props) {
    super(props);
    var usernameStr = firebase.auth().currentUser.displayName
    this.ref = firebase.firestore().collection('users').doc(usernameStr).collection('messages')

    this.state = {
      username: usernameStr,
      user: {
        _id: firebase.auth().currentUser.uid,
        name: usernameStr, 
        avatar: firebase.auth().currentUser.photoURL
      },
      messages: [],
      sendee:  ""
    }

    this.onSend = this.onSend.bind(this)
    
  }


  componentDidMount() {

    const { params } = this.props.navigation.state;
    const sendee = params ? params.sendee: null;
    this.setState({sendee})

    this.ref.orderBy("createdAt", "desc").onSnapshot(snapshot => {
      let receivedMessages = []
      let sentMessages = []


      snapshot.docs.map(doc => {
          receivedMessages.push ({
            _id: doc.id,
            ...doc.data()
          })
      })

      
      // snapshot.docs.map(doc => {
      //   if(doc.user._id == this.state.username){
      //     sentMessages.push({
      //       _id: doc.id,
      //       ...doc.data()
      //     })
      //   }
      //   else{
      //     receivedMessages.push ({
      //       _id: doc.id,
      //       ...doc.data()
      //     })
      //   }
      // })
      



      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.message, receivedMessages)
      }))
    })
  }


onSend([message]) {
  //this.ref.add(message)  
  //console.warn(this.state.sendee)          
  firestoreAPI.addMessage(this.state.username, message)
  firestoreAPI.addMessage(this.state.sendee, message)

}


render() {
  const { username, messages , user } = this.state
    return( <GiftedChat messages={messages} onSend= {this.onSend} user={user} />)
  }
}