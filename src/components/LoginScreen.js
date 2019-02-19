import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
