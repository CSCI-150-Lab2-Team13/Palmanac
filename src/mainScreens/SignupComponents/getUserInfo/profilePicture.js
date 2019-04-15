import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { setDownloadLinktoFirebase,setDownloadLinktoFirestore} from '../../../firebase/firestore'
import styles from '../styles'



const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


export default class ProfilePicture extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            UserName:'',
            imageName:"",
            imageData: null,
            avatarSource: null,
            uploading: false, 
            progress: 0,
            button: 'save',
            downloadURL: "",
            images: []
        }
    }

componentDidMount() {
    const  currentUser = firebase.auth().currentUser.displayName
    this.setState({ UserName: currentUser})
}


getImage() {
    ImagePicker.showImagePicker(options, response => {
      this.setState({
        imageData: response
      });
      console.log(this.setState.imageData)
      if (response.didCancel) {
        console.log("User cancelled picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  }


  goToNextScreen = () => {

    setDownloadLinktoFirebase(this.state.downloadURL)
    .then(async () => {
      setDownloadLinktoFirestore(this.state.downloadURL,this.state.UserName,this.state.imageName)
      .catch(error => {
        console.warn(error);
      })
      .then(async () => {
      this.props.navigation.navigate('App')
      })
    })
    .catch(error => {
      console.warn(error);
    });
    //
}

uploadImage() {
    this.setState({
      loader: true,
    });
    const fileType = this.state.imageData.fileName;
    const type = fileType.substr(fileType.indexOf(".") + 1);
    const sessionID = new Date().getTime()
    const imageName = `Profile Pictures/${this.state.UserName}_${sessionID}.jpg`
    const storageRef = firebase.storage().ref(this.state.UserName).child(imageName);
             // grab photo name from CloudFirebase user profile
             firebase
             .firestore()
             .collection('users')
             .doc(this.state.UserName)
             .get()
             .then((doc) => {
                 previousPhotoName = doc.get('photoName')
                 // if there is a photo name already set
                 // delete the previous photo in firebase storage
                 if (previousPhotoName != null) 
                 {
                     firebase
                         .storage()
                         .ref(previousPhotoName)
                         .delete()
                         .then()
                         .catch(error => console.log('An error occurred while deleting the photo', error))
                 }
             })
    storageRef
      .putFile(this.state.imageData.uri, {
        contentType: `image/${type}`
      })
      .then((result) => {
        this.setState({
          loader: false,
          downloadURL: result.downloadURL,
          button: "finish",
          imageName: imageName,
        });
        console.warn("Posted Successfully");
      })
      .catch(error => {
        console.warn(error);
      });
  }

  submitButton() {
    if (this.state.button === 'save') {
      return (
        <View style={styles.profile_item}>
        <Text style={styles.title}>  Profile Picture</Text>
        <View style={styles.avatar_container}>
            <Image
                style={styles.avatar_image}
                source={this.state.avatarSource}/>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
                    onPress={() => this.getImage()}
            >
            <Ionicons
                name='ios-images'
                size={64}
            />
            <Text style={{ paddingLeft: 5 }}>Open photo library</Text>
            </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress = {() => this.uploadImage()}>
            <Text>upload Image</Text>
         </TouchableOpacity>
         </View>
            
      </View>
    )
    }
    else if ( this.state.button === 'finish'){
        return (
   
          <View style={styles.profile_item}>

        <View>

            <TouchableOpacity
                onPress={() => this.goToNextScreen()}
            >
            <Text>next Screen</Text>
            
            </TouchableOpacity>
        </View>
    </View>
    

        )
    }
}


render() {
    return (
      <View>
          {this.submitButton()}
      </View>
    )
  }        
}