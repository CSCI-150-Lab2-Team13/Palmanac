import React, { Component } from 'react'
import { Text, View } from 'react-native'

import firebase from 'firebase';
import firestoreAPI from '../firebase/firestoreAPI'
import FileUploader from 'react-firebase-file-uploader';




import defaultAvatar from '../assets/default_profile.png'
class Profile extends Component {

  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
 
  render() {
    return (
      <View>
      <Text> Messages </Text>
    </View>
    );
  }
}


export default Profile;