import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { fetchEvents, fetchFriendList } from '../firebase/firestoreAPI'
import firebase from 'react-native-firebase'
import moment from "moment"
import _ from 'lodash';

export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser.displayName,
      errorMessage: null,
      loading: false, 
      datafetched : [],
      friendList: []
    }
  }


componentDidMount() {
  fetchFriendList(user)
  .then((results)=> this.setState({friendList:results}))
  .catch((error)=> this.setState({errorMessage:error}))
}



getEvents()
{
   this.state.friendList.map(item=>(
     fetchEvents(item)
     .then((results)=> this.setState({datafetched: [...this.state.datafetched, results ]}))
     .catch((error) => this.setState({ errorMessage: error }))
        ))
}
  









}

