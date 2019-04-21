import React, { Component } from 'react'
import {  View, StyleSheet, Image, TouchableOpacity,Text } from 'react-native'
import { Container,Icon, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base'

import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'



import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getUserData }  from '../../firebase/firestoreAPI'

export default class Profile extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
            
        )
    };
    

  

    constructor(props) {
        super(props);
        this.state = {
          user: firebase.auth().currentUser,
          userName: '',
          firstName: '',
          lastName: '',
          photoURL: '',
          errorMessage: null,
          isLoading: false,
          Following: 0,
          Followers: 0, 

        };
    }
    

    async componentDidMount() {

      const {currentUser} = await firebase.auth();
      const displayName = currentUser.displayName;
      this.setState({userName: displayName});
      const ref = firebase.firestore().collection('users').doc(this.state.userName);

      return ref.get().then(doc => {
        if (doc.exists) {
          let data = doc.data()
          this.setState({firstName : data.firstName, lastName : data.lastName})
        } 
        else {
            console.error("No such user!");
        }
    })
        .catch(function (error) {
            console.error("Error getting user:", error);
        });
}

goToFollowers = () => {
  this.props.navigation.navigate({ routeName: 'Followers'})
}


goToFollowing = () => {
  this.props.navigation.navigate({ routeName: 'Following'})
}



render() {
  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: this.state.user.photoURL}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
          <Text style={styles.name}> {this.state.userName}</Text>
          <Text style={styles.info}>{this.state.firstName} {this.state.lastName}</Text>

          <View style={{flexDirection: "row"}}>
          <Button style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
                  onPress = {() => this.goToFollowers()}>
          <Text style={styles.info}>Followers {this.state.Followers}</Text>
          </Button>
          
          <Button style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 10 }}
                  onPress = {() => this.goToFollowing()}>
          <Text style={styles.info}>Following {this.state.Following}</Text>
          </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
}



const styles = StyleSheet.create({
header:{
  backgroundColor: "#000FFF",
  height:200,
},
avatar: {
  width: 130,
  height: 130,
  borderRadius: 63,
  borderWidth: 4,
  borderColor: "white",
  marginBottom:10,
  alignSelf:'center',
  position: 'absolute',
  marginTop:130
},
name:{
  fontSize:22,
  color:"#FFFFFF",
  fontWeight:'600',
},
body:{
  marginTop:40,
},
bodyContent: {
  flex: 1,
  alignItems: 'center',
  padding:30,
},
name:{
  fontSize:28,
  color: "#696969",
  fontWeight: "600"
},
info:{
  fontSize:16,
  color: "#00BFFF",
  marginTop:10
},
description:{
  fontSize:16,
  color: "#696969",
  marginTop:10,
  textAlign: 'center'
},
buttonContainer: {
  marginTop:10,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
  backgroundColor: "#00BFFF",
},
});
