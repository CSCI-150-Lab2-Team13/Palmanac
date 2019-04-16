import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, Button, Title, Container,  Item, Input } from 'native-base';
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
                <View style={styles.linGrad}>
                <View style={styles.buttonView}>
                    <Item regular >
                        <Input 
                            style={styles.inputBox}
                            placeholder='Event Description' 
                            name="text"
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    </Item>
                </View>
                <View style={styles.buttonView}>
                    <Button 
                        block 
                        style={styles.buttonHard}
                        onPress= {() => this.props.navigation.navigate({ routeName: 'HardEvent', params: {eventString: this.state.text}}) }>
                       <Text>Submit</Text> 
                    </Button>
                </View>
                </View>
            )
        }
    }


    renderButtons(){
        if(!this.state.clicked){
            return(
                <View style={styles.linGrad}>
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
                    <View style={styles.buttonView}>
                        <Button block style = {styles.buttonCam} onPress={() => this.props.navigation.navigate({ routeName: 'CamEvent'})}>
                            <Title>Add By Picture</Title>
                        </Button>
                    </View>
                </View>
                )
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style = {styles.linGrad}
                colors={['#30336b', '#2c3e50']}>
                { this.renderButtons() }
                { this.renderText() }
                
                </LinearGradient>
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
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
     
    },
    buttonQuick: {
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 250,
        flexDirection: 'row',
        flex: 3,
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
        flex: 3,
        // paddingLeft: 100,
        // paddingRight: 100,
        paddingTop: 50,
        paddingBottom: 50,
        // marginTop: 20,
        marginBottom: 0,
        elevation: 4,
        shadowColor: "white",
        shadowOpacity: 0.5,
        shadowRadius: 10
        //backgroundColor = "#841584"
       // paddingLeft: 10
    },
    buttonCam: {
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 250,
        flexDirection: 'row',
        flex: 3,
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
    inputBox : {
        flex: 1,
        backgroundColor: 'white'
        
    }

})
