import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView , DrawerItems, Button, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";

import AuthLoadingScreen from './AuthLoading';
import HomeScreen from '../mainScreens/HomeScreen';
import SignUpScreen from '../mainScreens/SignUpScreen'
import LoginScreen from '../mainScreens/LoginScreen';
import HardEventFormScreen from '../forms/addHardEvent'


//import the different screens for different scenario's for tabNav
import Feed from '../bottomScreens/Feed'
import Messages from '../bottomScreens/Messages'
import Profile from '../bottomScreens/Profile'

//import different screens for swipeleftscreens

import Settings from '../swipeLeftScreens/SettingsScreen'
import { logoutUser } from '../firebase/FirebaseAPI';





export const DrawerWithLogoutButton = (props) => (

  <View style={{flex:1}}>
  <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      <Button title="Logout" onPress={ logoutUser()}/>
  </SafeAreaView>
  </View>
);



const DashboardTabNavigator = createBottomTabNavigator({
    Feed,
    Profile,
    Messages,
  }, 
  {
    navigationOptions:({navigation})=>{
      const {routeName} = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: routeName
      };
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
  
  const AppDrawerNavigator = createDrawerNavigator( {
  
    Home: {
      screen:DashboardStackNavigator
    },
  
    Settings: {
      screen: Settings
    },
    Logout: DrawerWithLogoutButton,
    HardEvent: {
      screen: HardEventFormScreen
    },
  
  });

  
  
  
  
  const AppStack  = createStackNavigator ({
    Home: {
      screen: AppDrawerNavigator,
    },

    //commented out for testing purpose 
    //HardEvent: {
    //  screen:HardEventFormScreen,
   // },
  
  });


  const AuthStack = createStackNavigator ({
    SignIn: {
      screen: LoginScreen,
    },

    SignUp: {
      screen:SignUpScreen,

    },  
  },

  {
    initialRouteName: 'SignUp',
    defaultNavigationOptions : {
      header: null,
    }
  }
  );

  
  

  


export default createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
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