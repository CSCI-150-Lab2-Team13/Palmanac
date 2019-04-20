import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';


import firebase from 'react-native-firebase'
import { checkfollowList, followUser, addFollowertoUser } from '../../firebase/firestoreAPI'
import styles from './styles'



export default class SearchPalInfo extends React.Component {
  constructor(props) {
    super(props)
    this.picture = require('../../img/palmanacLogo.png'),
    this.state = {
        sendRequest: false,
        defaultContainer: true,
        confirmationContainer: false,
        results: [],
        errorMessage: null, 
        userName: '',
        firstName:'',
        lastName:'',
        photoURL:'',

    }
}
   





    render(){
      return (
      <View> 
      {this.state.errorMessage &&
          <Text style={{ color: 'red', fontStyle: 'italic' }}>
                  {this.state.errorMessage}
          </Text>
      }
          <TouchableOpacity onPress={() => this.checkIfContactAlreadyInUserContactListThenAddContact()}>
          {this.state.defaultContainer &&
              <View style={styles.defaultContainer}>
                  <Image
                      source={{uri: this.props.contact.picture}}
                      style={styles.rounds}
                  />
                      <Text style={styles.text}>
                              {this.props.contact.name}
                      </Text>
                      <Text >
                              {this.props.contact.firstName}
                      </Text>
                      <Text>
                              {this.props.contact.lastName}
                      </Text>
              </View>
          }
          {this.state.confirmationContainer &&
              <View style={styles.confirmationContainer}>
                  <Text style={styles.text}>
                      send request
                  </Text>
                  <Text style={styles.text}>
                      
                  </Text>
              </View>
          }
          {this.state.sendRequest &&
              <View style={styles.RequestSend}>
                  <Icon
                      name='check'
                      type='entypo'
                      color='green'
                  />
              </View>
          }
      </TouchableOpacity>
      </View>
      )}
}