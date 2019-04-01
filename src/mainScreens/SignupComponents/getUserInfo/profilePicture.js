import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Ionicons from 'react-native-vector-icons/Ionicons'


import { uploadImage } from '../../../firebase/firestoreAPI'


export default class ProfilePicture extends React.Component {
    constructor(props) {
        this.state = {
            errorMessage: null,
            avatar: "",
            button: 'save'
        }
    }

openImageLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
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
                <Text> Hi </Text>
            >
            </TouchableOpacity>
        )
    }
    else if (this.state.button === 'nextscreen')
    {
        return (
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => this.goToNextScreen()} >
                <Text> HEllo </Text>

            </TouchableOpacity>

        )
    }
}

uploadPicturetoFirebase = () => {
    if (this.state.avatar === '')
    {
        this.setState( { errorMessage : "You have not selected a photo, would you like to continue? "})
    }
    else 
    {
        this.setState( { errorMessage: null })
        uploadImage(this.state.avatar).catch(error => this.setState ({ errorMessage: error }))
    }
    this.setState ({ button: 'nextscreen'})
}


goToNextScreen = () => {
        //
}


render() {
    return (
        <View >
            <Text>{strings('sign_up_screen.get_display_name.profil_photo.profil_photo')}</Text>
            <View>
                <Image
                    source={this.state.avatar}
                />
            </View>
            {this.state.errorMessage &&
                <Text style={{ color: 'red', fontStyle: 'italic', }}>
                    {this.state.errorMessage}
                </Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                    onPress={() => this._openImageLibrary()}
                >
                    <Ionicons
                        name='ios-images'
                        size={64}
                    />
                    <Text style={{ paddingLeft: 5 }}>{strings('sign_up_screen.get_display_name.profil_photo.library')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this._openCamera()}
                >
                    <Ionicons
                        name='ios-camera'
                        size={64}
                    />
                    <Text style={{ paddingLeft: 5 }}>{strings('sign_up_screen.get_display_name.profil_photo.photo')}</Text>
                </TouchableOpacity>
            </View>

            {this.SaveOrNextscreenButton()}


            <TouchableOpacity
                onPress={() => this._goToNextScreen()}
            >
                <Text>{strings('sign_up_screen.get_display_name.profil_photo.continue_without')}</Text>
            </TouchableOpacity>
        </View>
    )
 }
}