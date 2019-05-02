import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body,Right } from 'native-base';



import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import firebase from 'react-native-firebase'
import { checkFriendList, followUser, addFollowertoUser, sendNotification } from '../../firebase/firestoreAPI'
import styles from './styles'



export default class SearchPalInfo extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            defaultContainer: true,
            confirmationContainer: true,
            results: [],
            errorMessage: null, 
            userName: '',
            firstName:'',
            lastName:'',
            photoURL:'',
            sendNotification: false
        }
    }

   
async componentDidMount() {

        const {currentUser} = await firebase.auth();
        const displayName = currentUser.displayName;
        this.setState({userName: displayName});
        const ref = firebase.firestore().collection('users').doc(this.state.userName);
  
        return ref.get().then(doc => {
          if (doc.exists) {
            let data = doc.data()
            this.setState({firstName : data.firstName, lastName : data.lastName, photoURL:data.photoURL})
          } 
          else {
              console.error("No such user!");
          }
      })
          .catch(function (error) {
              console.error("Error getting user:", error);
          });
  }
  
checkIfContactAlreadyInUserContactListThenAddContact = async () => {

    
    const firstName = this.props.contact.firstName
    const lastName = this.props.contact.lastName
    const photoURL = this.props.contact.picture
    const PalToAdd = this.props.contact.name
    const eventType = 0
    checkFriendList(this.state.userName , PalToAdd)
    .then(results => {
         this.setState({ results: results})
    })
    .catch(error =>{
        this.setState({ errorMessage: error})
    })
    if (!this.state.results.length )
    {

        followUser(this.state.userName, PalToAdd, firstName, lastName,photoURL)
        .then(
            addFollowertoUser(PalToAdd, this.state.userName, this.state.firstName, this.state.lastName, this.state.photoURL)
            .catch((error)=> this.setState({errorMessage:error}))
        )
        .catch((error) =>this.setState({errorMessage:error}))
        if(!this.state.sendNotification)
        {
          sendNotification(this.state.userName,PalToAdd, this.state.firstName,this.state.lastName, this.state.photoURL, eventType)
          this.setState({sendNotification:true})
        }
    }
    else 
    {
        console.log("hi");
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
        </TouchableOpacity>
        </View>
    
    )
    }

}
