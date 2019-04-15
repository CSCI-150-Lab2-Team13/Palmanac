    
import React, { Component } from 'react';
import {
  View, ActivityIndicator, StatusBar, StyleSheet
} from 'react-native';
import { observer } from 'mobx-react/native';
import store from '../store';
import AuthStore from '../store/authStore';


@observer
export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.userCheck();
    }

    userCheck = () => {
      if (store.authStore.getUserStatus())
      {
          this.props.navigation.navigate('App')
      }
      else 
      {
          this.props.navigation.navigate('Login')
      }
      
    }


    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}