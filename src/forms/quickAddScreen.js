import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, Button, Title, Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient'

export default class QuickAddScreen extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            displated: false,
            text: ""
        };
        this.renderButtons = this.renderButtons.bind(this)
    }

    renderText(){
        if(this.state.clicked){
            return(
                <View>
                    <TextInput
                        name="text"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}>
                    </TextInput>
                    <Button onPress= {() => this.props.navigation.navigate({ routeName: 'HardEvent', params: {eventString: this.state.text}}) }>
                       <Text>Submit</Text> 
                    </Button>
                </View>
            )
        }
    }


    renderButtons(){
        if(!this.state.clicked){
            return(

        
                <View style = {styles.container}>

                <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style = {styles.container}
                colors={['#30336b', '#2c3e50']}>

                 <View style = {{paddingVertical: 5, marginTop: 90}}> 
                    <Button style = {styles.buttonQuick} onPress={ () => {this.setState({clicked: true})}}>
                        <Title>Quick Add Event</Title>
                    </Button>
                 </View>
                

                    <View style = {{paddingVertical: 50, marginBottom: 150}}>
                    <Button style = {styles.buttonQuick} onPress={() => this.props.navigation.navigate({ routeName: 'HardEvent'})}>
                        <Title>Add Event</Title>
                    </Button>
                    </View>
                 

                </LinearGradient>

                </View>

                )
        }

    }

    render(){
        return(
            <View>
                { this.renderButtons() }
                { this.renderText() }
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'black'
        //paddingTop: 110
    },
    buttonQuick: {
        borderRadius: 250,
        height: 100,
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        elevation: 4,
        shadowColor: "white",
        shadowOpacity: 0.5,
        shadowRadius: 10
        //backgroundColor = "#841584"
       // paddingLeft: 10
    }
})
