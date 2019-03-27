import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
  View,
} from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';
import firestoreAPI from '../firebase/firestoreAPI'
import firebase from '@firebase/app'
import moment from "moment"
import _ from 'lodash';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
     events: [],
     selected: {},
    };
    this.onDayPress = this.onDayPress.bind(this);
  


  }

  componentDidMount() {
    
    firestoreAPI.getEvents(firebase.auth().currentUser.uid).then( (event) =>
    
    this.setState(
      {
        events: this.state.events.concat(event)
      }
    )
)
.finally( () => {
  if(this.state.events){
      var selected = {}
      for(let i = 0, l = this.state.events.length; i < l; i++) {
        var dateVal = new Date(this.state.events[i]["startTime"]["seconds"] * 1000);
        var eventStr = moment(dateVal).format("YYYY-MM-DD")
        selected[eventStr] = 
          {
              //selected: true, 
              //disableTouchEvent: true, 
              marked: true,
              //selectedColor: 'blue',
              // text: {
              //   color: 'black',
              //   fontWeight: 'bold'
              // }
    
          }
        
        this.setState(
          {
            selected: selected
          }
        )
      }
    }
  }
)
.catch(error => {
  console.error("Error parsing document: ", error);
})
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
       <Text style={styles.text}>{JSON.stringify(this.state.selected)}</Text>
       
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={this.state.selected}
        />


        
      </ScrollView>

    );
  }

  onDayPress(day) {
    // var selected = {...this.state.selected}

    // if(selected[this.state.selectedDate]){

    //     selected[this.state.selectedDate]['selected'] = false;
    // }
    // else{
    //   selected[this.state.selectedDate] = { selected: false };
    // }

    // if(selected[day.dateString] ){
    //     selected[day.dateString]['selected'] = true;
    // }
    // else{
    //   selected[day.dateString] = { selected: true };
    // }



    // this.setState({
    //   selected: selected,
    //   selectedDate: day.dateString
    // });
    
    // this.forceUpdate()

  //   
  //   this.setState({
  //     selected: day.dateString
  //   });
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