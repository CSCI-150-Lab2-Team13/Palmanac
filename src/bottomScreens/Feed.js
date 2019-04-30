import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import firestoreAPI from '../firebase/firestoreAPI'
import firebase from 'react-native-firebase'
import { Container, Header, Content, Card, CardItem, Body, Title } from 'native-base';
import moment from "moment"
import _ from 'lodash';

// export default class fcmHandler extends React.PureComponent {

//   componentDidMount() {
  
//   firebase.messaging()
//     .hasPermission()
//     .then(enabled => {
//       if (!enabled) {
//         this._getPermission();
//       }
//     });
//   }
  
//    _getPermission = () => {
//     firebase.messaging()
//       .requestPermission()
//       .catch(error => {
//         // User has rejected permissions
//         this._getPermission();
//       });
//   };
  
//   }

export default class Feed extends Component {
    constructor(props) {
      super(props);
      this.state = {
       myEvents: [],
       events: [],
       softEvents: [],
       items: {},
       fcmToken : "",
       isLoading: true,
       isFocused: true
      };
    
      this.assignEvent = this.assignEvent.bind(this);
  
    }
  
    state = {
      isFocused: false
    };
  
     assignEvent(event){
        this.setState(
          {
            events: event
          }
        );
    }
  
    componentDidMount() {
     
        this.subs = [
          this.props.navigation.addListener("didFocus", () => {
            if(!typeof firebase.auth.currentUser === 'undefined') {
                firestoreAPI.getEvents(firebase.auth().currentUser.displayName).then( (eventList) =>
                {
                  //console.warn('getEvents reached')
                  this.setState(
                    {
                      myEvents: eventList
                    }
                  );
                }
              )
              .then(() => {
                return firestoreAPI.getFollowingEvents(firebase.auth().currentUser.displayName)
              })
              .then( (eventList) =>
              {
                this.assignEvent(eventList)
              }
            )
            .then(() =>{
              var eventsList = []
              var softEvents = []
              this.state.events.forEach( (eventList) => {
                eventList.forEach ((event) => {
                  if( !(event["startTime"] && event["endTime"]) ) 
                    softEvents.push(event)
                  else eventsList.push(event)
                })
                this.setState({
                  events: eventsList,
                  softEvents: softEvents
                })
              })
            })
          // .finally( () => {
          // if(this.state.events){
          //   var items = {}
          //     for(let i = 0, l = this.state.events.length; i < l; i++) {
          //     if(this.state.events[i]["startTime"] && this.state.events[i]["endTime"]){
                
          //         var dateVal = new Date(this.state.events[i]["startTime"])//["seconds"] * 1000);
                
          //         var eventStr = moment(dateVal).format("YYYY-MM-DD")
          //         var endVal = new Date(this.state.events[i]["endTime"])//["seconds"] * 1000);
          //         var startStr = moment(dateVal).format("HH:mm");
          //         var endStr = moment(endVal).format("HH:mm");
          //         items[eventStr] = 
          //           [{
          //             name: this.state.events[i]['title'],
          //             height: Math.max(80, Math.floor(Math.random() * 150)),
          //             desc: this.state.events[i]['desc'],
          //             startTime: startStr,
          //             endTime: endStr,
          //               //selected: true, 
          //               //disableTouchEvent: true, 
          //               // name: 'Item: ' + eventStr,
          //               // height: Math.max(50, Math.floor(Math.random() * 150))
                        
          //               //selectedColor: 'blue',
          //               // text: {
          //               //   color: 'black',
          //               //   fontWeight: 'bold'
          //               // }
          //           }]
          //         }
          //       }
          //       /*
          //         Case of soft events, where item is created but there is no 
          //         startTime or endTime
          //       */
          // }
          //   this.setState({
          //     items: items,
          //     isFocused: true
          //   })
          //  })
          .catch(error => {
            console.error("Error parsing document: ", error);
          })
          }    
        }),
          this.props.navigation.addListener("willBlur", () => this.setState({ isFocused: false }))
        ];

        
        AsyncStorage.getItem('fcmToken').then((fcmToken) => {
          
          if (fcmToken) {
            //console.warn(fcmToken)
            {this.setState({fcmToken})}
          }
        })
        .catch((error) =>{
          console.error('Whytho',error)
        })

    }
    componentWillUnmount() {
      this.subs.forEach(sub => sub.remove());
    }



  render() {
    return (
      <ScrollView style={styles.container}>
        {
        //  <Text> {JSON.stringify(this.state.events)} </Text>
       // <Text selectable={true} >{this.state.fcmToken}</Text>
        }
        
        {this.renderEvents()}
      </ScrollView>
    );
  }

  renderEvents(){

    return this.state.events.map( (event) => {
      var dateVal = new Date(event["startTime"])//["seconds"] * 1000);
      var eventStr = moment(dateVal).format("YYYY-MM-DD")
      var endVal = new Date(event["endTime"])//["seconds"] * 1000);
      var startStr = moment(dateVal).format('MMMM Do YYYY, h:mm a');
      var endStr = moment(endVal).format('MMMM Do YYYY, h:mm a');
      var col = false
      this.state.myEvents.map((myEvent) => {
        if(myEvent['startTime'] <= event['endTime'] && myEvent['endTime'] >= event["startTime"]){
          col = true
        }
      })
      if(!col){
        return(
          <View key={event["id"]} >
            <Card style={styles.EventsCard}>
            <TouchableOpacity             
              onPress={() => { 
              // alert("Clicked")
                //this.onEventPress(event['id']) 
                return
                } }
            >
              <CardItem >
                <Text style={{fontWeight: 'bold'}}>{event.title}</Text>
              </CardItem>
              <CardItem >
                <Text>Event By: </Text><Text style={{fontStyle: 'italic'}}>{event.username}</Text>
              </CardItem>
              <CardItem>
              <Text>{event.desc ? event.desc :"No description provided" }</Text> 
              </CardItem>
              <CardItem>
                <Text style={{fontWeight: 'bold'}}>{startStr}</Text> 
                <Text> to </Text> 
                <Text style={{fontWeight: 'bold'}}>{endStr}</Text>
              </CardItem>
              
              </TouchableOpacity>
            </Card>
          </View>
        )
       }
    });
}

renderMap(location){
  //TODO: Convert location string to region
  if(location){
    return <View>
                    {/* <MapView
              provider={ PROVIDER_GOOGLE }
              style={ styles.container }
              //customMapStyle={  }
              showsUserLocation={ true }
              region={ this.state.region }
              //onRegionChange={ region => this.setState({region}) }
              //onRegionChangeComplete={ region => this.setState({region}) }
            >
            </MapView> */}
    </View>
  }
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
  eventsView:{
    flex: 2,
    paddingLeft: 10
  },
  EventsCard : {
    flex: 5,
    paddingLeft: 10
   
  }
});