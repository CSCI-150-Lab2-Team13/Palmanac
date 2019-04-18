import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Title } from 'native-base';
import {Calendar, Agenda} from 'react-native-calendars';
import firestoreAPI from '../firebase/firestoreAPI'
import firebase from 'react-native-firebase'
import moment from "moment"
import _ from 'lodash';

 
export default class MainCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
     events: [],
     softEvents: [],
     items: {},
     isLoading: true,
     isFocused: true
    };
    this.onDayPress = this.onDayPress.bind(this);
    this.renderSoftEvents = this.renderSoftEvents.bind(this);
    this.assignEvent = this.assignEvent.bind(this);
   // this.onEventPress = this.onEventPress.bind(this);
  }

  state = {
    isFocused: false
  };

 


   assignEvent(event){
    //console.error(JSON.stringify(event))
  //  if(event.hasOwnProperty('startTime') && event.hasOwnProperty('endTime')){
      this.setState(
        {
          events: this.state.events.concat(event)
        }
      );
  //  }
    // else{
    //   this.setState({
    //     softEvents: this.state.softEvents.concat(event)
    //   })
    // }
    
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => 
          firestoreAPI.getEvents(firebase.auth().currentUser.displayName).then( (eventList) =>
          {
            this.assignEvent(eventList)
          }
        )
        .then(() =>{
          eventsList = []
          softEvents = []
          this.state.events.forEach( (event) => {
            if( !(event["startTime"] && event["endTime"]) ) 
              softEvents.push(event)
            else eventsList.push(event)
          })
          this.setState({
            events: eventsList,
            softEvents: softEvents
          })
        })
      .finally( () => {
      if(this.state.events){
        var items = {}
          for(let i = 0, l = this.state.events.length; i < l; i++) {
          if(this.state.events[i]["startTime"] && this.state.events[i]["endTime"]){
            
              var dateVal = new Date(this.state.events[i]["startTime"])//["seconds"] * 1000);
            
              var eventStr = moment(dateVal).format("YYYY-MM-DD")
              var endVal = new Date(this.state.events[i]["endTime"])//["seconds"] * 1000);
              var startStr = moment(dateVal).format("HH:mm");
              var endStr = moment(endVal).format("HH:mm");
              items[eventStr] = 
                [{
                  name: this.state.events[i]['title'],
              //    height: Math.max(80, Math.floor(Math.random() * 150)),
                  desc: this.state.events[i]['desc'],
                  startTime: startStr,
                  endTime: endStr,
                  id: this.state.events[i]['id']
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
              }
            }
            /*
              Case of soft events, where item is created but there is no 
              startTime or endTime
            */
      }
        this.setState({
          items: items,
          isFocused: true
        })
      })
      .catch(error => {
        console.error("Error parsing document: ", error);
      })
      
      ),
      this.props.navigation.addListener("willBlur", () => this.setState({ isFocused: false }))
    ];

  }
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }




  render() {
    //TODO:
    /*
      Add container/rendering for soft events
    */
 
 

 
    return (

      <View style={styles.container}>
        <Button title= "Create Event"
          onPress={() => this.props.navigation.navigate({ routeName: 'QuickAddScreen'})}>
        </Button>

     
{
      
//         <Text style={styles.text}>{JSON.stringify(this.state.items)}</Text>
//         <Text style={styles.text}>{JSON.stringify(this.state.events)}</Text>
//         <Text style={styles.text}>{JSON.stringify(this.state.softEvents)}</Text>
   //<Text style={styles.text}>{JSON.stringify(this.state.softEvents)}</Text>
}
       
     
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
        <ScrollView style={styles.softEvents} horizontal={true}>
          {this.renderSoftEvents()}
        </ScrollView>

        
      </View>

    );
  }

  
  renderSoftEvents(){
    return this.state.softEvents.map( (event) => {
      return(
        <View key={event["id"]} >
          <Card style={styles.softEventsCard}>
          <TouchableOpacity             
            onPress={() => { 
             // alert("Clicked")
              this.onEventPress(event['id']) 
  
              } }
          >
            <Text style={{fontWeight: 'bold'}}>
              {event.title}
            </Text>
            <Text style={{width: 75}}>
              {event.desc ? event.desc :"" }
            </Text>
            </TouchableOpacity>
          </Card>
        </View>
      )
    });
}

  onEventPress(id){
    this.props.navigation.navigate({ routeName: 'HardEvent', params: {id: id}})
    //   firestoreAPI.getEventById(firebase.auth().currentUser.displayName, id).then( (eventList) =>
    //   {
    //    return eventList[0]
    //   }
    //  )
    //  .then(event){
      
    //  }
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
            // {height: item.height}]}>
      <TouchableOpacity onPress={() => { 
        // alert("Clicked")
         this.onEventPress(item['id']) 

         } }>
        <View style={[styles.item]}>

          <Text style={{fontWeight: 'bold'}} >{item.name} </Text>
          <Text>{item.startTime} to {item.endTime}</Text>
          {
            //TODO: Add padding below/other styling
          }
          <Text style={styles.text}>{item.desc}</Text>
      
        </View>
      </TouchableOpacity>
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
    flex: 2,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,

  },
  calendar: {
    flex: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  text: {
    flex: 5,
    textAlign: 'center',
    borderColor: '#bbb',
   // padding: 10,
  // paddingBottom: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  emptyDate: {
    flex: 1,
    paddingTop: 30
 
  },
  softEvents:{
    flex: 3,
    paddingLeft: 10
  },
  softEventsCard : {
    flex: 3,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10
  }
});