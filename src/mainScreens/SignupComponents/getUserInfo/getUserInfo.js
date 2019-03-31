import React from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'

import UserName from '../getUserInfo/UserName'
import ProfilePicture from '../getUserInfo/profilePicture'



export default class GetUserInfo extends React.Component {
    constructor(props){
        this.state = {
            errorMessage: null, 
            display: 'UserName'
        }
    }


navigateToProfilePicture = () => {
    this.setState ( { display: 'ProfilePicture'} )
}

navigateToLoginScreen = () => {
    this.props.navigation.navigate('Login')
}

navigateToHomeScreen = () => {
    this.props.navigation.navigate('AuthLoading')
}

displayUserNameAndProfilePicture = () =>  {
    if (this.state.display === 'Username')
    {
        return (
            <UserName
                navigateToLoginScreen={ this.navigateToLoginScreen }
                navigateToProfilePicture = { this.navigateToProfilePicture }
            />
        )
    }
    else if (this.state.display === "ProfilePicture")
    {
        return (
            <ProfilePicture
        
            />

            )
    }
}


render() {
    return (
        <View
            style={{ flex: 1, backgroundColor: '#63869f' }}
        >
            {this._displayTopComponent()}
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={{ flex: 1, backgroundColor: 'white'}}
                >
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={-64}
                        style={{ flex: 1}}
                    >
                        {this.AccountNameAndProfilPhotoDisplay()}
                    </KeyboardAvoidingView>
                </ScrollView>
        </View>
    )
 }
}