import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import {  Container, Header, Content, Card, CardItem, Button, Thumbnail, Left, Body, Right, Icon } from "native-base";

import firebase from 'react-native-firebase'


import FontAwesome from "react-native-vector-icons/FontAwesome"

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import styles from './styles'


export default class Userinfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null, 
            renderUserProfile: false,
            Followers: 0,
            Following: 0 , 
            FollowingCurrentUser: null,
            errorMessage: null, 
        }
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
    })
        
    ref2.onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=> {
        followingCount +=1
        console.warn(followerCount)
        })
        this.setState({Followers:followingCount})
    })
        
}

checkFollow =() => {
    const ref = firebase.firestore().collection("users").doc(this.props.contact.Username).collection('following')

    ref.doc(firebase.auth().currentUser.displayName).get()
    .then(doc => {
        if(doc.exists) {
            this.setState({FollowingCurrentUser: true})
        }
        else {
            this.setState({FollowingCurrentUser:false})
        }

    })
    .catch((error) => this.setState({ errorMessage: error }))
}
      

renderProfile = () => {
    this.setState({ renderUserProfile: !this.state.renderUserProfile });
    this.setFollowerAndFollowingCount()
    this.checkFollow()
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
                <TouchableOpacity
                onPress={this.renderProfile}
                >
                    <SimpleLineIcons
                        name = 'user-unfollow'
                        size = {30}
                    />
                </TouchableOpacity>
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
            {this.profile()}
        </View>
        )
    }
  }
}
