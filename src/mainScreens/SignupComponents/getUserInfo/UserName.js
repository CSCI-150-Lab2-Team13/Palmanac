import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import firebase from 'react-native-firebase'
import { createFireStoreDoc, loginToFirebase , sendFirstandLastName} from '../../../firebase/firestoreAPI'
import styles from '../styles';




export default class UserName extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userName: "",
            firstName: "",
            lastName:"",
            errorMessage: null, 
            button: 'submit',
            placeholder1: "",
            secureTextEntry: false
        }

    }

componentDidMount() {
        const  currentUser = firebase.auth().currentUser.displayName
        this.setState({ userName: currentUser})
    
}

userNameInputChange  = (text) => {
    this.setState({ userName: text})
}



firstNameInputChange = (text) => {
    this.setState({firstName:text })
}


lastNameInputChange = (text) => {
    this.setState({lastName:text })
}



setFirstandLastName = () =>{

    if (this.state.firstName === '' && this.state.lastName ==='' ||
        this.state.firstName != '' && this.state.lastName ==='' ||
        this.state.firstName === '' && this.state.lastName !=''){
        
            this.setState({ errorMessage : ("Fields cannot be blank")})
        }
    else {
        sendFirstandLastName( this.state.userName, this.state.firstName,this.state.lastName)
        .then (async () =>{
            this.props.navigation.navigate('profilePicture')
        })
        .catch((error) =>{
            if(error === 'No user is currently logged in') {
                this.setState({
                    errorMessage: ('Login Now'),
                    button: 'Login',
                    secureTextEntry: true,
                    userName: "",

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






setUsername = () => {
    if (this.state.userName ==''){
        this.setState({errorMessage: ("Username cannot be blank")})
    }
    else{
        createFireStoreDoc(this.state.userName)
        .then(async () => {
            this.setState ({ button: 'nextform'})
          })
        .catch((error) =>{
            if(error === 'No user is currently logged in') {
                this.setState({
                    errorMessage: ('Login Now'),
                    button: 'Login',
                    secureTextEntry: true,
                    userName: "",

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
    <View >
        <Text style={styles.title}>  User Name</Text>
            
            {this.state.errorMessage &&
                    <Text style={{ color: 'red', fontStyle: 'italic' }}>
                        {this.state.errorMessage}
                    </Text>
            }
                <TextInput
                    placeholder = 'userName'
                    onChangeText = {(text) => this.userNameInputChange(text) }
                    autoFocus = {false}
                    style = {styles.textInput}
                    value = {this.state.userName}
                />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
                onPress={() => this.setUsername()}
                >
                    <LinearGradient
                         start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                         colors={['#88b097', '#07416b']}
                         style={styles.button}
                    >
                        <Text style = { styles.button_text}> Send Username </Text>
                    </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>
        )
    }
    else if ( this.state.button === 'nextform'){
        return (

            
    <View >
            <Text style={styles.title}>  User Name</Text>
            {this.state.errorMessage &&
                    <Text style={{ color: 'red', fontStyle: 'italic' }}>
                        {this.state.errorMessage}
                    </Text>
            }

                
                <TextInput
                    placeholder = 'First Name'
                    onChangeText = {(text) => this.firstNameInputChange(text) }
                    autoFocus = {false}
                    style = {styles.textInput}
                    value = {this.state.firstName}
                />
                

                <TextInput
                    placeholder = 'Last Name'
                    onChangeText = {(text) => this.lastNameInputChange(text) }
                    autoFocus = {false}
                    style = {styles.textInput}
                    value = {this.state.lastName}
                />
        <View>
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => this.setFirstandLastName()}
                >
                    <LinearGradient
                         start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                         colors={['#88b097', '#07416b']}
                         style={styles.button}
                    >
                        <Text style = { styles.button_text}> Continue to profile Picture </Text>
                    </LinearGradient>
            </TouchableOpacity>
            </View>
    </View>
    

        )
    }
}

render() {
    return (
        
    <View style={styles.profile_item}>
       
             {this.submitButton()}
       
       
    </View>
      

    )
 }
}