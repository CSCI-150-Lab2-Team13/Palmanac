import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <GoogleSigninButton
       style={{ width: 192, height: 48 }}
       size={GoogleSigninButton.Size.Wide}
       color={GoogleSigninButton.Color.Dark}
       onPress={this._signIn}
       disabled={this.state.isSigninInProgress} />
       
    );
  }
}

export default SignUp;
