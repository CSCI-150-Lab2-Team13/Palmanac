import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

import { createUserDocinFirestore, loginToFirebase } from '../../../firebase/firestoreAPI'




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
        createUserDocinFirestore(this.state.userName)
        .then(async () =>{
            this.props.gotoProfilePicture()
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



render() {
    return (
        <View style= {{flex: 2}}>
            <View>
                <Text>Username</Text>
                {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontStyle: 'italic', }}>
                            {this.state.errorMessage}
                        </Text>}
                <TextInput
                    placeholder = {this.state.placeholder1}
                    onChangeText = {(text) => this.userNameInputChange(text) }
                    autoFocus = {false}
                    value = {this.state.userName}
                />
            </View>
        </View>
    )
 }
}