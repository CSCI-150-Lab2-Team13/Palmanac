import React from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'

import UserName from '../getUserInfo/UserName'



export default class GetUserInfo extends React.Component {
    constructor(props){
        this.state = {
            errorMessage: null, 
            display: 'UserName'
        }
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

displayUserNameAndProfilePicture() {
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
}