import React from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'

import UserName from '../getUserInfo/UserName'
import ProfilePicture from '../getUserInfo/profilePicture'



export default class GetUserInfo extends React.Component {
   
    
    
    constructor(props){
    super(props)
        this.state = {
            errorMessage: null, 
            display: 'UserName'
        }
    }

displayTopComponent () {
    return (
        <SafeAreaView>
            <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text> {this.state.display} </Text>
            </View>
    
            </View>
        </SafeAreaView>
    )
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
            <View>
            <UserName
                navigateToLoginScreen={ this.navigateToLoginScreen }
                navigateToProfilePicture = { this.navigateToProfilePicture }
            />
            </View>
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
        <View style={{ flex: 1, backgroundColor: '#63869f' }}>
            { this.displayTopComponent() }
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={{ flex: 1, backgroundColor: 'white'}}
                >
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={-64}
                        style={{ flex: 1}}
                    >
                    <UserName> </UserName>
                    </KeyboardAvoidingView>
                </ScrollView>
        </View>
    )
 }
}