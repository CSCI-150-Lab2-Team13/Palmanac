import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, Alert, View } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from './styles'
export default class Userinfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null, 
        }
    }
  render() {
    return (
        <View> 
        {this.state.errorMessage &&
            <Text style={{ color: 'red', fontStyle: 'italic' }}>
                    {this.state.errorMessage}
            </Text>
        }
            <TouchableOpacity >
                <View style={styles.defaultContainer}>
                    <Image
                        source={{uri: this.props.contact.photoURL}}
                        style={styles.rounds}
                    />
                        <Text style={styles.text}>
                                {this.props.contact.firstName}
                        </Text>
                        <Text >
                                {this.props.contact.lastName}
                        </Text>
                        <Text>
                                {this.props.contact.Username}
                        </Text>
                </View>
        </TouchableOpacity>
        </View>
    )
  }
}
