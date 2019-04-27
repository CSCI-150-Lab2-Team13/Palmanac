import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firestoreAPI from '../firebase/firestoreAPI'
import firebase from 'react-native-firebase'
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
       events: [],
       softEvents: [],
       items: {},
       isLoading: true,
       isFocused: true
      };
      // DELETE THIS } WHEN UNCOMMENTED
    }
    //   this.assignEvent = this.assignEvent.bind(this);
  
    // }
  
    // state = {
    //   isFocused: false
    // };
  
    //  assignEvent(event){
    //     this.setState(
    //       {
    //         events: this.state.events.concat(event)
    //       }
    //     );
    // }
  
    // componentDidMount() {
    //   this.subs = [
    //     this.props.navigation.addListener("didFocus", () => 
    //         firestoreAPI.getFollowingEvents(firebase.auth().currentUser.displayName).then( (eventList) =>
    //         {
    //           this.assignEvent(eventList)
    //         }
    //       )
    //       .then(() =>{
    //         var eventsList = []
    //         var softEvents = []
    //         this.state.events.forEach( (event) => {
    //           if( !(event["startTime"] && event["endTime"]) ) 
    //             softEvents.push(event)
    //           else eventsList.push(event)
    //         })
    //         this.setState({
    //           events: eventsList,
    //           softEvents: softEvents
    //         })
    //       })
    //     // .finally( () => {
    //     // if(this.state.events){
    //     //   var items = {}
    //     //     for(let i = 0, l = this.state.events.length; i < l; i++) {
    //     //     if(this.state.events[i]["startTime"] && this.state.events[i]["endTime"]){
              
    //     //         var dateVal = new Date(this.state.events[i]["startTime"])//["seconds"] * 1000);
              
    //     //         var eventStr = moment(dateVal).format("YYYY-MM-DD")
    //     //         var endVal = new Date(this.state.events[i]["endTime"])//["seconds"] * 1000);
    //     //         var startStr = moment(dateVal).format("HH:mm");
    //     //         var endStr = moment(endVal).format("HH:mm");
    //     //         items[eventStr] = 
    //     //           [{
    //     //             name: this.state.events[i]['title'],
    //     //             height: Math.max(80, Math.floor(Math.random() * 150)),
    //     //             desc: this.state.events[i]['desc'],
    //     //             startTime: startStr,
    //     //             endTime: endStr,
    //     //               //selected: true, 
    //     //               //disableTouchEvent: true, 
    //     //               // name: 'Item: ' + eventStr,
    //     //               // height: Math.max(50, Math.floor(Math.random() * 150))
                      
    //     //               //selectedColor: 'blue',
    //     //               // text: {
    //     //               //   color: 'black',
    //     //               //   fontWeight: 'bold'
    //     //               // }
    //     //           }]
    //     //         }
    //     //       }
    //     //       /*
    //     //         Case of soft events, where item is created but there is no 
    //     //         startTime or endTime
    //     //       */
    //     // }
    //     //   this.setState({
    //     //     items: items,
    //     //     isFocused: true
    //     //   })
    //     //  })
    //     .catch(error => {
    //       console.error("Error parsing document: ", error);
    //     })
        
    //     ),
    //     this.props.navigation.addListener("willBlur", () => this.setState({ isFocused: false }))
    //   ];
  
    // }
    // componentWillUnmount() {
    //   this.subs.forEach(sub => sub.remove());
    // }

  render() {
    return (
      <View>
        <Text> Hello!  </Text>
        <Text> {this.state.events} </Text>
      </View>
    );
  }
}