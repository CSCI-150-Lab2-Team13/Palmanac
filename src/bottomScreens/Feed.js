import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import firestoreAPI from '../firebase/firestoreAPI'
import firebase from 'react-native-firebase'

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
     events: [],
      selected: "",
    };
    this.onDayPress = this.onDayPress.bind(this);
    
    firestoreAPI.getEvents(firebase.auth().currentUser.uid).then( (event) =>
    
    this.setState(
      {
        events: this.state.events.concat(event)
      }
    )
  )
  .catch(error => {
    console.error("Error getting document: ", error);
  })
  }

  componentDidMount() {
    
    this.setState({
      
    });
  }

  render() {

    
    return (
      <ScrollView style={styles.container}>
        <Button title= "Create Hard Event"
          onPress={() => this.props.navigation.navigate({ routeName: 'HardEvent'})}>
        </Button>
        <Text style={styles.text}>Calendar with selectable date and arrows</Text>
       {
        <Text style={styles.text}>{JSON.stringify(this.state.events)}</Text>
       }
       
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'blue'}}}
        />
        
      </ScrollView>

    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});