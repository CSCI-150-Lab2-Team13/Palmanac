import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Icon } from 'react-native-elements'


import firebase from 'react-native-firebase'
import { checkFriendList, addPalToFirestore } from '../../firebase/firestoreAPI'
import styles from './styles'


export default class SearchPalInfo extends React.Component {
    constructor(props) {
        super(props)
        this.picture = require('../../img/palmanacLogo.png'),
        this.state = {
            sendRequest: false,
            defaultContainer: true,
            confirmationContainer: false,
            results: [],
            errorMessage: null, 

        }
    }


checkIfContactAlreadyInUserContactListThenAddContact = async () => {
    const currentUser = firebase.auth().currentUser.displayName
    const PalToAdd = this.props.contact.name
    checkFriendList(currentUser, PalToAdd)
    .then((results)=> this.setState({results:results}))
    .catch((error) =>this.setState({ errorMessage: error }))
    if (!this.state.results.length )
    {
        addPalToFirestore(currentUser, PalToAdd)
        .catch((error) =>this.setState({errorMessage:error}))
    }
    else 
    {
        console.log("hi");
    }

}




render(){
    return (
    <View> 
        {this.state.errorMessage &&
             <Text style={{ color: 'red', fontStyle: 'italic' }}>
                   {this.state.errorMessage}
             </Text>
        }
        <TouchableOpacity onPress={() => this.checkIfContactAlreadyInUserContactListThenAddContact()}>
        {this.state.defaultContainer &&
            <View style={styles.defaultContainer}>
                <Image
                    source={{uri: this.props.contact.picture}}
                    style={styles.rounds}
                />
                    <Text style={styles.text}>
                            {this.props.contact.name}
                    </Text>
                    <Text >
                            {this.props.contact.firstName}
                    </Text>
                    <Text>
                            {this.props.contact.lastName}
                    </Text>
            </View>
        }
        {this.state.confirmationContainer &&
            <View style={styles.confirmationContainer}>
                <Text style={styles.text}>
                    send request
                </Text>
                <Text style={styles.text}>
                    
                </Text>
            </View>
        }
        {this.state.sendRequest &&
            <View style={styles.RequestSend}>
                <Icon
                    name='check'
                    type='entypo'
                    color='green'
                />
            </View>
        }
    </TouchableOpacity>
    </View>
    )}
}