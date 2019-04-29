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




export default class Messages extends Component {

  constructor(props) {
    super(props);
    var usernameStr = firebase.auth().currentUser.displayName
    this.ref = firebase.firestore().collection('users').doc(usernameStr).collection('messages')

    this.state = {
      formCompleted: false,
      username: usernameStr,
      user: {
        _id: firebase.auth().currentUser.uid,
        name: usernameStr, 
        avatar: firebase.auth().currentUser.photoURL
      },
      messages: [],
      sendee:  {}
    }

    this.onSend = this.onSend.bind(this)
    this.completeForm = this.completeForm.bind(this)
  }


  componentDidMount() {

    // const { params } = this.props.navigation.state;
    // const sendee = params ? params.sendee: null;
    const sendee = 'Sloopy'
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

      /*
      snapshot.docs.map(doc => {
        if(doc.user._id == this.state.username){
          sentMessages.push({
            _id: doc.id,
            ...doc.data()
          })
        }
        else{
          receivedMessages.push ({
            _id: doc.id,
            ...doc.data()
          })
        }
      })
      */



      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.message, receivedMessages)
      }))
    })
  }


onSend([message]) {
  //this.ref.add(message)            
  firestoreAPI.addMessage(this.state.username, message)
  firestoreAPI.addMessage(this.state.sendee, message)
}


completeForm() {
  this.setState(prevState => ( {
    formCompleted: !prevState.formCompleted
  }))
}



render() {
  const { formCompleted, username, messages , user } = this.state


  if(formCompleted) {
    return <GiftedChat messages={messages} onSend= {this.onSend} user={user} />
  }
 
  return (
    <View>
      <Text>Form</Text>
      <TextInput
        placeholder="id"
        onChangeText={text =>
          this.setState(prevState => ({
            user: {
              ...prevState.user,
              _id: text
            }
          }))
        }
      />
      <TextInput
        placeholder="name"
        onChangeText={text =>
          this.setState(prevState => ({
            user: {
              ...prevState.user,
              name: text
            }
          }))
        }
      />
      <TextInput
        placeholder="avatar"
        onChangeText={text =>
          this.setState(prevState => ({
            user: {
              ...prevState.user,
              avatar: text
            }
          }))
        }
      />
      <Button onPress={this.completeForm} title="Complete Form" />
    </View>
   )
  }
}