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
     items: {},
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
      var items = {}
      for(let i = 0, l = this.state.events.length; i < l; i++) {
        var dateVal = new Date(this.state.events[i]["startTime"]["seconds"] * 1000);
        var eventStr = moment(dateVal).format("YYYY-MM-DD")
        var endVal = new Date(this.state.events[i]["endTime"]["seconds"] * 1000);
        var startStr = moment(dateVal).format("HH:mm");
        var endStr = moment(endVal).format("HH:mm");
        items[eventStr] = 
          [{
            name: this.state.events[i]['title'],
            height: Math.max(80, Math.floor(Math.random() * 150)),
            desc: this.state.events[i]['desc'],
            startTime: startStr,
            endTime: endStr,
              //selected: true, 
              //disableTouchEvent: true, 
              // name: 'Item: ' + eventStr,
              // height: Math.max(50, Math.floor(Math.random() * 150))
              
              //selectedColor: 'blue',
              // text: {
              //   color: 'black',
              //   fontWeight: 'bold'
              // }
          }]
        
        this.setState(
          {
            items: items
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
      <View style={styles.container}>
        <Button title= "Create Hard Event"
          onPress={() => this.props.navigation.navigate({ routeName: 'HardEvent'})}>
        </Button>
{/*
        <Text style={styles.text}>Calendar with selectable date and arrows</Text>
        <Text style={styles.text}>{JSON.stringify(this.state.items)}</Text>
        <Text style={styles.text}>{JSON.stringify(this.state.events)}</Text>
        */}
        
        {/* <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={this.state.items}
        />
         */}
        <Agenda
                
                    //loadItemsForMonth={this.loadItems.bind(this)}
                    items={this.state.items}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    renderEmptyData={this.renderEmptyData.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    style={styles.calendar}
                   
                    //    {{ '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                  />


        
      </View>

    );
  }



  renderEmptyDate() {
    // TODO: Provide styling for dates with deleted/removed events
    return (
     <View style={styles.emptyDate}><Text> No Events Yet!</Text></View>
    );
  }
  renderEmptyData(){
        // TODO: Provide styling for empty events
    return (
      <View style={styles.emptyDate}><Text> No Events Yet!</Text></View>
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.name} </Text>
        <Text>{item.startTime} to {item.endTime}</Text>
        {
          //TODO: Add padding below/other styling
        }
        <Text style={styles.text}>{item.desc}</Text>
     
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }


  onDayPress(day) {
    // var items = {...this.state.items}

    // if(items[this.state.itemsDate]){

    //     items[this.state.itemsDate]['items'] = false;
    // }
    // else{
    //   items[this.state.itemsDate] = { items: false };
    // }

    // if(items[day.dateString] ){
    //     items[day.dateString]['items'] = true;
    // }
    // else{
    //   items[day.dateString] = { items: true };
    // }



    // this.setState({
    //   items: items,
    //   itemsDate: day.dateString
    // });
    
    // this.forceUpdate()

  //   
  //   this.setState({
  //     items: day.dateString
  //   });
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  calendar: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
   // padding: 10,
  // paddingBottom: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});