import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Ionicons from 'react-native-vector-icons/Ionicons'


import { uploadImage } from '../../../firebase/firestoreAPI'

import styles from '../styles'

let options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class ProfilePicture extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            avatar: require('../../../../images/ic_tag_faces.png'),
            firebaseImageUrl:require('../../../../images/ic_tag_faces.png'),
            button: 'save'
        }
    }

openImageLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
           // this.setState({ errorMessage: response.error })
        }
        else {
            let source = {uri: 'data:image/jpeg;base64,' + response.data, image: "file.png"};
            this.setState({
                avatar: response.uri,
                button: 'save'
            });
            this.uploadPicturetoFirebase(this.state.avatar)
        }
    });
}

openCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
            return
        }
        else if (response.error) {
            this.setState({ errorMessage: response.error })
        }
        else {
            let requireSource = { uri: response.uri }
            this.setState({
                avatar: requireSource,
                button: 'save'
            })
        }
    });
}

saveOrNextscreenButton() {
    if (this.state.button === 'save')
    {
        return (
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress = { () => this.uploadPicturetoFirebase()}>
            <Text>upload Image</Text>
            </TouchableOpacity>
        )
    }
    else if (this.state.button === 'nextscreen')
    {
        return (
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => this.goToNextScreen()} >
                <Text>Next</Text>

            </TouchableOpacity>

        )
    }
}

uploadPicturetoFirebase = () => {
    if (this.state.avatar === require('../../../../images/ic_tag_faces.png'))
    {
       console.log("You have not selected a photo, would you like to continue? ")
    }
    else 
    {
        uploadImage(this.state.avatar)
            .catch(error =>{
            console.log(error)
        })
    }
    this.setState ({ button: 'nextscreen'})
}


goToNextScreen = () => {
    this.props.navigation.navigate('App')
}


render() {
    return (
        <View style={styles.profile_item}>
        <Text style={styles.title}>Profile Picture</Text>
        <View style={styles.avatar_container}>
            <Image
                style={styles.avatar_image}
                source={this.state.avatar}
            />
        </View>

        {( JSON.stringify(this.state.errorMessage)) &&
        <Text style={{ color: 'red', fontStyle: 'italic', }}>  {JSON.stringify(this.state.errorMessage)} </Text> }






            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                    onPress={() => this.openImageLibrary()}
                >
                    <Ionicons
                        name='ios-images'
                        size={64}
                    />
                    <Text style={{ paddingLeft: 5 }}>Open photo library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.openCamera()}
                >
                    <Ionicons
                        name='ios-camera'
                        size={64}
                    />
                    <Text style={{ paddingLeft: 5 }}>open camera</Text>
                </TouchableOpacity>
            </View>

            
            { this.saveOrNextscreenButton()}
          


            <TouchableOpacity
                onPress={() => this.goToNextScreen()}
            >
            <Text>next Screen</Text>
            
            </TouchableOpacity>
        </View>
    )
 }
}