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
                <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style = {styles.linGrad}
                colors={['#30336b', '#2c3e50']}>
                
                <View style={styles.buttonView}>
                    <Button block style = {styles.buttonQuick} onPress={ () => {this.setState({clicked: true})}}>
                        <Title>Quick Add Event</Title>
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button block style = {styles.buttonHard} onPress={() => this.props.navigation.navigate({ routeName: 'HardEvent'})}>
                        <Title>Add Event</Title>
                    </Button>
                </View>
                 

                </LinearGradient>
                )
        }

    }

    render(){
        return(
            <View style={styles.container}>
                { this.renderButtons() }
                { this.renderText() }
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
  
        //flexDirection: 'column',
      //  backgroundColor: 'black',
        //paddingTop: 110
        flex: 10
    },
    linGrad : {
        flex: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonView : {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    buttonQuick: {
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 250,
        flexDirection: 'row',
        flex: 1,
        // paddingLeft: 100,
        // paddingRight: 100,
        paddingTop: 50,
        paddingBottom: 50,
        // marginTop: 20,
        marginBottom: -200,
        elevation: 4,
        shadowColor: "white",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        //backgroundColor = "#841584"
       // paddingLeft: 10
    },
    buttonHard: {
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 250,
        flexDirection: 'row',
        flex: 1,
        // paddingLeft: 100,
        // paddingRight: 100,
        paddingTop: 50,
        paddingBottom: 50,
        // marginTop: 20,
        marginBottom: 200,
        elevation: 4,
        shadowColor: "white",
        shadowOpacity: 0.5,
        shadowRadius: 10
        //backgroundColor = "#841584"
       // paddingLeft: 10
    },

})
