import React, { Component } from 'react'
import { Text, View } from 'react-native'

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
            
                <View style={styles.confirmationContainer}>
                    <Text style={styles.text}>
                        send request
                    </Text>
                    <Text style={styles.text}>
                        
                    </Text>
                </View> &&
                <View style={styles.RequestSend}>
                    <Icon
                        name='check'
                        type='entypo'
                        color='green'
                    />
                </View>
        </TouchableOpacity>
        </View>
    )
  }
}

