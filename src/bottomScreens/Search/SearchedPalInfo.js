import React from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Icon } from 'react-native-elements'


import styles from './styles'

export default class SearchPalInfo extends React.Component {
    constructor(props) {
        super(props)
        this.picture = require('../../img/palmanacLogo.png'),
        this.state = {
            sendRequest: false,
            defaultContainer: true,
            confirmationContainer: false,
        }
    }



render(){
    return (
        <TouchableOpacity>
        {this.state.defaultContainer &&
            <View style={styles.defaultContainer}>
                <Image
                    source={this.picture}
                    style={styles.rounds}
                />
                <Text style={styles.text}>
                  
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
    )

}
}