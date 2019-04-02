import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View, Text
} from 'react-native';
import firebase from 'react-native-firebase'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = firebase.auth().currentUser;
        // await AsyncStorage.getItem('userToken');

        console.log(userToken ? 'App' : 'Auth');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');

    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
    
            this.props.navigation.navigate('App');
          } else {
            this.props.navigation.navigate('Login');
          }
        });
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