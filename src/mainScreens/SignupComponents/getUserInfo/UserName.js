import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { createFireStoreDoc, loginToFirebase } from '../../../firebase/firestoreAPI'
import styles from '../styles';




export default class UserName extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userName: "",
            errorMessage: null,
            button: 'submit',
            placeholder1: "",
            secureTextEntry: false
        }
    }




userNameInputChange = (text) => {
    this.setState({userName:text })
}

setUsername = () => {
    if (this.state.userName ==''){
        this.setState({errorMessage: ("Username cannot be blank")})
    }
    else{
        createFireStoreDoc(this.state.userName)
        .then(async () =>{
            this.props.navigation.navigate('profilePicture')
        })
        .catch((error) =>{
            if(error === 'No user is currently logged in') {
                this.setState({
                    errorMessage: ('Login Now'),
                    button: 'Login',
                    secureTextEntry: true,
                    UserName: "",

                })
            }
                // if a user name is already set up for this email address
                // => redirect to next screen
            else if (error === "A user name already exists for this email address") {
                this.setState ({ errorMessage: ("A user name already exists for this email address ")})
                setTimeout(()=> { this.props.gotoProfilePicture() }, 1000)
            }
            else {
                this.setState({ errorMessage: error })
            }
        })
    }
}

submitButton() {
    if (this.state.button === 'submit') {
        return (
            <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => this.setUsername()}
            >
            <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            colors={['#88b097', '#07416b']}
            style={styles.button}
            >
            <Text style = { styles.button_text}> Set Username </Text>

            </LinearGradient>
            </TouchableOpacity>


            

        )
    }
}



render() {
    return (
        <View style= {{flex: 2}}>
            <View style = {styles.profile_item}>
                <Text style= {styles.title}>Username</Text>
                {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', }}>
                            {this.state.errorMessage}
                        </Text>}
                <TextInput
                    placeholder = 'userName'
                    onChangeText = {(text) => this.userNameInputChange(text) }
                    autoFocus = {false}
                    style = {styles.textInput}
                    value = {this.state.userName}
                />
                { this.submitButton()}
            </View>
        </View>
    )
 }
}