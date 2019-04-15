import React, { Component } from 'react';
import { View, Text , FlatList} from 'react-native';
import { fetchUserFollowing } from '../../firebase/firestore'
import firebase from 'react-native-firebase'
import moment from "moment"
import _ from 'lodash';


import EventInfo from '../Feed/EventInfo'

export default class Feed extends Component {
    constructor(props) {
      super(props);
      this.state = {
       errorMessage: null,
       friendslist: [] ,
       softEvents: [],
       isLoading: true
      };
  }
  
componentWillMount() {

    const user =  firebase.auth().currentUser.displayName
    const ref = firebase.firestore().collection('users').doc(user).collection('following')
    
    ref.get()
        .then(querySnapshot => {

          if (querySnapshot.empty) {
            this.setState( {friendslist: []}) 
          } 
          else {
              querySnapshot.forEach(doc => {
                this.setState( {friendslist: [...this.state.friendslist, doc.data()]})
              })
          }
        })
        .catch((err) => {
          return 'an error has occurred while searching for pals: ', err
      })
 }



renderFriendsList() {
  if (this.state.friendslist.length == 0)
  {
    return (
      <View>
          <Text> Add More Friends  </Text>
      </View>
    ) 
  }
  else 
  {

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      {this.state.errorMessage &&
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
              {this.state.errorMessage}
          </Text>
      }
    
  </View>
    ) 

  }
}


    
  render() {
    return (
      <View>
            {this.renderFriendsList()}
          
      </View>
    );
  }
}