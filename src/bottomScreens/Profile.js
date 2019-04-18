import React, { Component } from 'react'
import {  View, StyleSheet, Image, TouchableOpacity,Text } from 'react-native'
import { Container,Icon, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react';



class Profile extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
            
        )
    };




render() {

  return (
    <View>
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri:photoURL}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
          <Text style={styles.name}> {userName}</Text>
          <Text style={styles.info}>{firstName} {lastName}</Text> 
          </View>
      </View>
    </View>
    }
    </View>
   );
 }
}
export default observer(Profile);

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
