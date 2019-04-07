import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView , DrawerItems, Button, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
import firebase from 'react-native-firebase'
import Octicons from "react-native-vector-icons/Octicons";



import AuthLoadingScreen from './AuthLoading';
import HomeScreen from '../mainScreens/HomeScreen';
import SignUpScreen from '../mainScreens/SignupComponents/SignUpScreen'
import LoginScreen from '../mainScreens/LoginScreen';



import UserName from '../mainScreens/SignupComponents/getUserInfo/UserName'
import profilePicture from '../mainScreens/SignupComponents/getUserInfo/profilePicture'


import HardEventFormScreen from '../forms/addHardEvent'


//import the different screens for different scenario's for tabNav
import Feed from '../bottomScreens/Feed'
import Pals from '../bottomScreens/Pals/Pals'
import Messages from '../bottomScreens/Messages'
import Profile from '../bottomScreens/Profile'
import MainCalendar from '../bottomScreens/MainCalendar'

//import different screens for swipeleftscreens

import Settings from '../swipeLeftScreens/SettingsScreen'

import { Header } from 'native-base';




const DrawerWithLogoutButton = props => {
  return (


 <TouchableOpacity
    onPress = {() => firebase.auth().signOut().catch(error =>{
      console.log(error)
      props.navigation.navigate('Login')
    })}
  >
  <View>
    <Octicons
      name ='sign-out'
      type='Octicons'
      size={25}
      color='black'
      style={{ marginLeft: 10 }}
      />
  </View>
  <Text> Logout </Text>
  </TouchableOpacity>

  );
};



const DashboardTabNavigator = createBottomTabNavigator({
    Feed,
    Pals,
    Profile,
    Messages,
    MainCalendar,
  }, 
  {
    navigationOptions:({navigation})=>{
      Header:null
    },
     tabBarOptions: {
     //activeTintColor: '#e91e63',
     activeTintColor: "#f5f6fa",      
     inactiveTintColor: "#3c6382",
     //fontFamily: "CircularStd-Bold",


      labelStyle: {
        //fontSize: 13,
        fontWeight: "bold",
        fontSize: 18,
        //lineHeight: 20,
       // color: '#fff',
      fontFamily: "Product Sans",  

      },
      style: {
        //backgroundColor: '#2f3640',
        backgroundColor: '#0a3d62',
        paddingVertical: 10,
        paddingRight: 15,
        borderColor: 'yellow',
        height: 55,


      },
    }
},

); 
  //});
  
  const DashboardStackNavigator = createStackNavigator ({
    DashboardTabNavigator : DashboardTabNavigator
  
    },
    {
      defaultNavigationOptions: ({navigation}) => {
        return {
          //headerLeft: <Icon name="md-menu" size={30} />
        };
      }
  
    }
  );
  
  const AppDrawerNavigator = createDrawerNavigator( 
    {
  
      Home: {screen:DashboardStackNavigator},
      Settings: {screen: Settings},
    },
    {
      contentComponent: DrawerWithLogoutButton,
  
    }
  );

  
  
  
  
  const AppStack  = createStackNavigator ({
    Home: {
      screen: AppDrawerNavigator,
    },
    HardEvent: {
     screen:HardEventFormScreen,
   },
  
  });

  
  


export default createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Signup:SignUpScreen, 
      Login:LoginScreen, 
      UserName: UserName,
      profilePicture: profilePicture,
      
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      margin: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, .87)',
    },
    iconContainer: {
      marginHorizontal: 16,
      width: 24,
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
    }
  });