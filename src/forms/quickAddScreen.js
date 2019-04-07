import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput } from 'react-native';
import { View, Text, Button } from 'native-base';
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
                <View>
                    <Button onPress={ () => {
                        this.setState({
                            clicked: true
                        })
                    }}>
                        <Text>
                            Quick Add Event
                        </Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate({ routeName: 'HardEvent'})}> 
                        <Text>Add Event</Text>
                    </Button>
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
