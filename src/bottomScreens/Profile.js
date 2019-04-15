import React, { Component } from 'react'
import {  View, StyleSheet, Image, TouchableOpacity,Text } from 'react-native'
import { Container,Icon, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base'


import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { withAuthorization} from '../Session';
import { withFirebase } from '../firebase';
import firebase from 'react-native-firebase'




class Profile extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
            
        )
    };
    

  

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
        };
    }
    
    componentDidMount() {
      if (
        !(
          this.props.userStore.users &&
          this.props.userStore.users[this.props.match.params.id]
        )
      ) {
        this.setState({ loading: true });
      }
  
      this.props.firebase
        .user(this.props.match.params.id)
        .on('value', snapshot => {
          this.props.userStore.setUser(
            snapshot.val(),
            this.props.match.params.id,
          );
  
          this.setState({ loading: false });
        });
}

componentWillUnmount() {
  this.props.firebase.user(this.props.match.params.id).off();
}



render() {
  const user = (this.props,userStore.users || {})[
    this.props.match.params.id
  ];
  const { loading } = this.state;
  return (
    <View>
    {user && (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: this.state.user.photoURL}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
          <Text style={styles.name}> {this.state.userName}</Text>
          <Text style={styles.info}>{this.state.firstName} {this.state.lastName}</Text> 
          </View>
      </View>
    </View>
    )}
    </View>
   );
 }
}

export default compose(
  withFirebase,
  inject('userStore'),
  observer,
)(Profile);


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
