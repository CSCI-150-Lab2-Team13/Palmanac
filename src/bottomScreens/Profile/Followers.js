import React, { Component } from 'react'
import { Text, View , SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
import { Icon } from 'react-native-elements'


import firebase from 'react-native-firebase'


import Userinfo from './Userinfo'
import styles from './styles'

export default class Followers extends Component {

constructor(props) {
    super(props)
    this.state = {
        user: firebase.auth().currentUser.displayName,
        errorMessage: null,
        loading: false, 
        followerList: []
        }
      }
      

componentDidMount() {
    this.getFriends()

}

getFriends () {
    const ref  = firebase.firestore().collection("users").doc(this.state.user).collection('followers')
    var friends = [];
    ref.onSnapshot((querySnapshot)=> {
        querySnapshot.forEach((doc)=>
         {
            friends.push({
                userName :doc.data().userName,
                firstName :doc.data().firstName,
                lastName :doc.data().lastName,
                photoURL:doc.data().photoURL,
                id : doc.id
            })
        })
        this.setState({friendList:friends})
    })
}

render() {
  return (
      <View> 
      {this.state.errorMessage &&
          <Text style={{ color: 'red', fontStyle: 'italic' }}>
                  {this.state.errorMessage}
          </Text>
      }
          <TouchableOpacity >
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
          
              <View style={styles.confirmationContainer}>
                  <Text style={styles.text}>
                      send request
                  </Text>
                  <Text style={styles.text}>
                      
                  </Text>
              </View> &&
              <View style={styles.RequestSend}>
                  <Icon
                      name='check'
                      type='entypo'
                      color='green'
                  />
              </View>
      </TouchableOpacity>
      </View>
  )
}
}
