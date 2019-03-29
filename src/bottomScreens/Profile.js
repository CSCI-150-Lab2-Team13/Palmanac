import React, { Component } from 'react'
import {  View, StyleSheet, Image, TouchableOpacity, Text, Icon } from 'react-native'
import { Right } from 'react-native-base'

import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'



import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

let userID = '';

export default class Profile extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
            
        )
    };
    

  

    constructor(props) {
        super(props);
        this.state = {
          currentUser: null,
          userName: '',
          firstName: '',
          lastName: '',
          photoURL: '',
          errorMessage: null,
          isLoading: false,

        };
    }
    


async componentDidMount() {

      const {currentUser} = await firebase.auth();
      userID = currentUser.uid;
      this.setState({currentUser});
      const userId = this.state.currentUser.uid;  
      const ref = firebase.firestore().collection('users').doc(userId);

      return ref.get().then(doc => {
        if (doc.exists) {
          let data = doc.data()
          this.setState({firstName : data.firstName, lastName : data.lastName, userName:data.userName, photoURL:data.photoURL})
        } 
        else {
            console.error("No such user!");
        }
    })
        .catch(function (error) {
            console.error("Error getting user:", error);
        });
}


_renderImage = () => {
  const uri = this.state.photoURL
  if (this.state.isLoading === true) {
      return (
          <ActivityIndicator
              size='large'
              style={styles.avatar_image}
          />
      )
  } else if (this.state.photoURL == null || this.state.photoURL == undefined) {
      return (
          <TouchableOpacity
              onPress={() => this._openImagePicker()}
          >
              <Image
                  //style={styles.avatar_image}
                  //source={this.state.defaultPicture}
              />
          </TouchableOpacity>

      )
  } else {
      return (
          <TouchableOpacity
              onPress={() => this._openImagePicker()}
          >
              <ImageCacheProvider
                  ImageCacheManagerOptions={{ ttl: 100 }}>
                  <CachedImage
                      //style={styles.avatar_image}
                      source={{ uri: uri }}
                  />
              </ImageCacheProvider>
          </TouchableOpacity>

      )
  }
}

render() {
  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Right> <EntypoIcon name="Edit" /></Right>
            <Text style={styles.name}> {this.state.userName}</Text>
            <Text style={styles.info}>{this.state.firstName} {this.state.lastName}</Text> 
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
