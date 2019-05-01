import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Button, Thumbnail, Left, Body, Right, Icon } from "native-base";

import firebase from 'react-native-firebase'
import FontAwesome from "react-native-vector-icons/FontAwesome"



import { checkFriendList, followUser, addFollowertoUser, unfollowUser, removeFollowerfromUser } from "../../firebase/firestoreAPI"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import styles from './styles'


export default class Userinfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            photoURL: '',
            errorMessage: null, 
            renderUserProfile: false,
            Followers: 0,
            Following: 0 , 
            FollowingCurrentUser: null,
            FollowingContact: null,
            errorMessage: null, 
            results: [],
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
          })
          .finally(
            this.setFollowerAndFollowingCount()
          );
  }



followContact = async () => {

    
    const firstName = this.props.contact.firstName
    const lastName = this.props.contact.lastName
    const photoURL = this.props.contact.photoURL
    const PalToAdd = this.props.contact.Username
    console.warn(this.state.userName, PalToAdd,this.state.userName, this.state.firstName, this.state.lastName, this.state.photoURL)
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
    }
    else 
    {
        console.log("hi");
    }


}

unfollowContact =  () => {

    const PalToAdd = this.props.contact.Username 
    console.warn(this.state.userName, PalToAdd)
    unfollowUser(this.state.userName, PalToAdd)
    .then(
        
        removeFollowerfromUser(PalToAdd, this.state.userName)
        .catch((error)=> this.setState({errorMessage:error}))
    )
    .catch((error) =>this.setState({errorMessage:error}))
    .finally(
    )


}





setFollowerAndFollowingCount = () =>{

    const ref  = firebase.firestore().collection("users").doc(this.props.contact.Username).collection('following')
    const ref2  = firebase.firestore().collection("users").doc(this.props.contact.Username).collection('followers')
    followerCount = 0 
    followingCount = 0 
    ref.onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=> {
        followerCount +=1
        console.warn(followerCount)
        })
        this.setState({Following:followerCount})
        followerCount = 0
    })
        
    ref2.onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=> {
        followingCount +=1
        console.warn(followerCount)
        })
        this.setState({Followers:followingCount})
        followingCount = 0 
    })
        
}

checkFollowingUser =() => {

    console.warn(this.state.userName, this.props.contact.Username)
    const ref = firebase.firestore().collection("users").doc(this.props.contact.Username).collection('following')

    ref.doc(this.state.userName).get()
    .then(doc => {
        if(doc.exists) {
            this.setState({FollowingCurrentUser: false})
        }
        else {
            this.setState({FollowingCurrentUser:true})
        }

    })
    .catch((error) => this.setState({ errorMessage: error }))
}

checkFollowingContact = () => {
    const ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.displayName).collection('following')

    ref.doc(this.props.contact.Username).get()
    .then(doc => {
        if(doc.exists) {
            this.setState({FollowingContact: true})
        }
        else {
            this.setState({FollowingContact:false})
        }

    })
    .catch((error) => this.setState({ errorMessage: error }))
}



      

renderProfile = () => {
    this.setState({ renderUserProfile: !this.state.renderUserProfile });
    this.setFollowerAndFollowingCount()
    this.checkFollowingUser()
    this.checkFollowingContact()
}
profile() {
    return (
    <Container>
    <Header />
    <Content>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{uri:this.props.contact.photoURL}} />
            <Body>
              <Text> @{this.props.contact.Username} </Text>
              <Text note>{this.props.contact.firstName }  {this.props.contact.lastName}</Text>
            </Body>
          </Left>

          <Right> 
          {!this.state.FollowingCurrentUser &&
            <Text style={{ color: 'red', fontStyle: 'italic' }}>
                this user does not follow you 
            </Text>
          }
          {this.state.FollowingCurrentUser &&
            <Text style={{ color: 'red', fontStyle: 'italic' }}>
                this user follows you 
            </Text>
          }
            <View style={{flexDirection: "row"}}>

            {!this.state.FollowingContact &&
                <TouchableOpacity
                onPress={() => this.followContact()}> 
                <SimpleLineIcons
                    name = 'user-follow'
                    size = {30}
                />
                </TouchableOpacity>
            }
            {this.state.FollowingContact &&
                <TouchableOpacity
                onPress={() => this.unfollowContact()}
                >
                    <SimpleLineIcons
                        name = 'user-unfollow'
                        size = {30}
                    />
                </TouchableOpacity>
            }
                <TouchableOpacity
                onPress={this.renderProfile}
                >
                    <FontAwesome
                        name = 'close'
                        size = {40}
                    />
                </TouchableOpacity>
            </View>
            </Right>   
        </CardItem>
        <CardItem cardBody>
        <Button style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
        >
          <Text style={styles.info}>Followers {this.state.Followers}</Text>
        </Button>
          
        <Button style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 10 }}
        >
          <Text style={styles.info}>Following {this.state.Following}</Text>
          </Button>
        </CardItem>
      </Card>
    </Content>
  </Container>
    )
}
  
render() {
    if(!this.state.renderUserProfile)
    return (
        <View> 
        {this.state.errorMessage &&
            <Text style={{ color: 'red', fontStyle: 'italic' }}>
                    {this.state.errorMessage}
            </Text>
        }
            <TouchableOpacity
             onPress={this.renderProfile}
            >
                <View style={styles.defaultContainer}>
                    <Image
                        source={{uri: this.props.contact.photoURL}}
                        style={styles.rounds}
                    />
                        <Text style={styles.text}>
                                {this.props.contact.Username}
                        </Text>
                </View>
        </TouchableOpacity>
        </View>
    )
    else {
        return (
        <View>
        {this.state.errorMessage &&
            <Text style={{ color: 'red', fontStyle: 'italic' }}>
                    {this.state.errorMessage}
            </Text>
        }
            {this.profile()}
        </View>
        )
    }
  }
}
