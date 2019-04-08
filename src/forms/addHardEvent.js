import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import _ from 'lodash';
import firebase from 'react-native-firebase'
import { generatePushID } from '../util/generatePushID';
import { chrono } from 'chrono-node'


import firestoreAPI from '../firebase/firestoreAPI'
import { RRule, RRuleSet, rrulestr } from 'rrule'


// TODO: 
//       (REMOVED FOR NOW) Add Selection
//       Add Selection of Invitees
//       Add Selection of Group

// Refactoring potential by using predictions as a hidden form field that shows
//   only when the result is being searched for, use picker/dialog?
const h = 400;
const w = 400;
const ASPECT_RATIO = w / h;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const days = [
  {
    id: RRule.MO,
    name: 'Monday'
  }, 
  {
    id: RRule.TU,
    name: 'Tuesday'
  },
  {
    id: RRule.WE,
    name: 'Wednesday'
  },
  {
    id: RRule.TH,
    name: 'Thursday'
  },
  {
    id: RRule.FR,
    name: 'Friday'
  },
  {
    id:RRule.SA,
    name: 'Saturday'
  },
  {
    id: RRule.SU,
    name: 'Sunday'
  }
]
const months = [
  {
    id: 1,
    name: 'January'
  }, 
  {
    id: 2,
    name: 'February'
  },
  {
    id: 3,
    name: 'March'
  },
  {
    id: 4,
    name: 'April'
  },
  {
    id: 5,
    name: 'May'
  },
  {
    id: 6,
    name: 'June'
  },
  {
    id: 7,
    name: 'July'
  },
  {
    id: 8,
    name: 'August'
  },
  {
    id: 9,
    name: 'September'
  },
  {
    id: 10,
    name: 'October'
  },
  {
    id: 11,
    name: 'November'
  },
  {
    id: 12,
    name: 'December'
  }
]

var rec_index;
var start_index;
var end_index;
var freq_index;
var interval_index;
var fields;
// 
var data;
var freq;
var interval;
export default class HardEventFormView extends Component {
    constructor() {
      super();
      this.state = {
        error: "",
        destination: "",
        predictions: [],
        placeId: "",
        placeDetails: "",
        rec: "",
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        username: firebase.auth().currentUser.displayName
      };
      this.onValueChange = this.onValueChange.bind(this);
      this.onChangeDestinationDebounced = _.debounce(this.onChangeDestination, 750)
      this.create = this.create.bind(this);

    }


      // RECCURENCE RULE KEY VALUES
      // If year or month then use freq, byyearday/bymonthday/byweekday, and dtstart
      // rule: {
      //   freq: "",
      //   dtstart: "",
      //   bymonthday: "",
      //   byweekday: "",
      //   byyearday: "",
      //   until: ""
      // },

        // declare this outside of render
        componentDidMount() {
          
          this.setCurrentLocation();
    
          fields = this.formGenerator.props['fields'];
          // _.set(this.formGenerator)
          //Replace with filter/better implementation later
          for(let i = 0, l = fields.length; i < l; i++) {
            if( fields[i]['name'] == 'reccurrance'){
              rec_index = i;
            }
            if(fields[i]['name'] == 'startTime')
              start_index = i;
            if(fields[i]['name'] == 'endTime')
              end_index = i;
          }
    
          data = fields[rec_index]['fields'];
    
          for(let i = 0, l = data.length; i < l; i++) {
            if( data[i]['name'] == 'freq')
              freq_index = i;
            if(data[i]['name'] == 'interval')
              interval_index = i;
          }
    
          freq = data[freq_index];
          interval = data[interval_index];

          if(this.props.navigation.state.params.eventString){
            var chrono = require('chrono-node');
            var results = chrono.parse(this.props.navigation.state.params.eventString)
           // results[0].index;  
            const getDiff = (string, diffBy) => string.split(diffBy).join('')
            const title = getDiff(this.props.navigation.state.params.eventString, results[0].text)

            
            // results[0].text;   // 'tomorrow from 10 to 11 AM'
            // results[0].ref;    // Sat Dec 13 2014 21:50:14 GMT-0600 (CST)
            this.formGenerator.setValues({
              title: title,
              startTime: results[0].start.date(),
              endTime: results[0].end.date()
            })
          }

        }


    setCurrentLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }, (error) => console.log(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      this.watchID = navigator.geolocation.watchPosition(position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      });
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
    

    onValueChange(){
     // if (name == 'location'){
      const formValues = this.formGenerator.getValues();
      if (formValues.location != '' || (this.state.placeId == '' && this.state.destination != '') ){
        this.onChangeDestinationDebounced(formValues.location);
      }
      else if(this.state.placeId != '' && formValues.location == ''){
        this.setState({
          placeId: '',
          placeDetails: '',
          predictions: [],
          
        });
      }




      // NOTE: VERY IMPORTANT
      // Originally only used for debugging, but this function call is
      // actually necessary for onValueChange to display properly
      // this seems to allow onValueChange to update before exiting
      // which does not happen otherwise
      this.setState({
        error: JSON.stringify(interval.value)
     })

      fields[end_index].hidden = false;
      fields[start_index].mode = 'datetime';
      //Show fields based on which value is filled in
      if(freq.value != "Select"){
        // Unhide selected value corresponding form
        

        var found_days = false;
        var found_months = false;
        if(interval.type != "date" && interval.value){
         for(let i = 0, l = days.length; i < l; i++) {
           //for(let j = 0, k = interval.value.length; j < k; j++){
              if(days[i] == interval.value[0]){
                found_days = true;
                break;
              }
          //  }
          //  if(found_days) break;
         } 
         for(let i = 0, l = months.length; i < l; i++) {
           // for(let j = 0, k = interval.value.length; j < k; j++){
              if(months[i] == interval.value[0]){
                found_months = true;
                break;
              }
          //  }
          //  if(found_months) break;
        }
      }

        fields[start_index].required = true;
        fields[end_index].required = true;
        freq.required = true;



        if(freq.value == "Weekly"){
          if( found_months ||  interval.type == "date"){
            interval.value = [];
          }
          interval.type = 'select';
          interval.objectType = true;
          interval.labelKey = 'name';
          interval.primaryKey = 'id';
          interval.options = days;
          

          //interval.multiple = true;
          interval.hidden = false;
        }
        else if (freq.value == "Monthly"){
          //Used to reset value if switched weekly
          if ( found_days || interval.type == "date" ){
            interval.value = []
          }
          //
          
          interval.type = 'select';       
          interval.objectType = true;
          interval.labelKey = 'name';
          interval.primaryKey = 'id';
          interval.options = months;

          interval.hidden = false;

          
        }
        
        else if(freq.value == "Yearly"){
          fields[end_index].required = false;
          // Replace interval value with
          // implementation that uses start date
          // and has no end date


          // if(found_days || found_months ){
          //   interval.value = new Date();
          // }        
          // interval.type = "date";
          // interval.mode = 'date';
          interval.hidden = true;
          fields[end_index].hidden = true;
          fields[start_index].mode = 'date';
        }
      }
      else{
        fields[start_index].required = false;
        fields[end_index].required = false;
        freq.required = false;
        // Set all value to hidden
        interval.hidden = true;
      }
      

    }


    create() {
      var formValues = this.formGenerator.getValues();
      // rule: {
      //   freq: "",
      //   dtstart: "",
      //   bymonthday: "",
      //   byweekday: "",
      //   byyearday: "",
      //   until: ""
      // },
      var rule;
      var rule_text = "";
      var min_range_list;
      var hr_range_list;

      // Get day of the year
      if(formValues.startTime){
        var now = formValues.startTime
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
      }
      var id = generatePushID()
      _.set(formValues,'id', id)

      if(freq.value != "Select"){
        if(freq.value == "Weekly" || freq.value == "Monthly"){
          
          const startHour = formValues.startTime.getHours();
          const endHour = formValues.endTime.getHours();
          const startMin = formValues.startTime.getMinutes();
          const endMin = formValues.endTime.getMinutes();

          var hr_range = endHour - startHour;
          
          var min_range = endMin - startMin;

          if (hr_range > 24 || hr_range < 0){
            hr_range_list =  _.range(24);
          }
          else{
            hr_range_list = _.range(startHour, endHour);
          }

          if(min_range > 60 || min_range < 0){
            min_range_list = _.range(60);
          }
          else{
            if(startHour == endHour){
              min_range_list = _.range(startMin, endMin);
            }
            else{
              min_range_list = _.range(0,endMin)
            }
          }

        }

        if(freq.value == "Weekly" && interval.value){
          var weekDays = [];

          for(let i = 0, l = interval.value.length; i < l; i++) {
            weekDays.push(interval.value[i]['id']['weekday']);
          }
          // Lodash range function
          // _.range(startHour, endHour)
          rule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: weekDays,
            byhour: hr_range_list,
            byminute: min_range_list,
            dtstart: formValues.startTime,
            //until: formValues.endTime,
          })

        }
        else if(freq.value == "Monthly" && interval.value){
          var monthVals = [];
          
          for(let i = 0, l = interval.value.length; i < l; i++) {
            monthVals.push(interval.value[i]['id']);
          }

          

        rule = new RRule({
            freq: RRule.MONTHLY,
            bymonthday: monthVals,
            byhour: hr_range_list,
            byminute: min_range_list,
            dtstart: formValues.startTime,
            //until: formValues.endTime,
          })
        }
        else if (freq.value == "Yearly" && interval.value){
          //var now = new Date();
 
          rule = new RRule({
            freq: RRule.YEARLY,
            byyearday: day,
            dtstart: formValues.startTime,
          })
         
        }
      rule_text = rule.toString();
    
        
       _.set(formValues, 'rruleString', rule_text);
 
   
      }
      //_.set(formValues, 'user_id', this.state.user_id);
      this.setState({
        error: JSON.stringify(formValues)
      });
      //
      //INSERT CODE FOR WRITING TO DB
      delete formValues.reccurrance;
      firestoreAPI.addEvent(username, formValues)
      this.props.navigation.navigate({ routeName: 'MainCalendar'})
      //
    }


    async onChangeDestination(destination){
      // call Places
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDxqKMK2s7H_wUn35Otn2DSNWXNaXONHBA&input=${destination}&location=${this.state.region.latitude},${this.state.region.longitude}&radius=2000`;
      try{
        const result = await fetch(apiUrl);
        const json = await result.json();
        this.setState({
          predictions: json.predictions
        });
      }
      catch(err){
        console.log(err);
      }
    }

    render() {

      const predictions = this.state.predictions.map( prediction => (
        <TouchableOpacity        
          key={prediction.id} 
          onPress={() => {
            this.formGenerator.setValues({
              location: prediction.description
            })
            this.setState( {
              placeId: prediction.place_id,
              //placeDetails: prediction.description,
              predictions: [],
              destination: ""
            } ) }
          }>
          <Text 
            style={styles.predictionStyle}>
              {prediction.description}
          </Text> 
        </TouchableOpacity>
      ));

      return (
        <ScrollView style={styles.wrapper}>
          <View style={styles.topText}>
            <Text>Create Hard Event</Text>
          </View> 
          <View>
            <GenerateForm
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={fields}
              onValueChange={this.onValueChange}
            
            />
          </View>
          <View>
          
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
            {/* <TextInput 
              placeholder="Enter destination..."
              value={this.state.destination} 
              onChangeText={destination =>       
                {
                  this.setState({destination});
                  this.onChangeDestinationDebounced(destination)
                }
              }
          
              style={styles.destinationInput}
            >
            </TextInput> */}
            
            {predictions}
            {
         // <Text>{this.state.error}</Text>
        }
           
           
          </View>

          <View style={styles.submitButton}>

            <Button block onPress={() => this.create()}>
              <Text>Create Event</Text>
            </Button>
          </View>
        </ScrollView>
      );
    }
  }
   
  //AppRegistry.registerComponent('HardEventFormView', () => HardEventFormView);


  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      //marginTop: 50,
    },
    submitButton: {
      paddingHorizontal: 10,
      paddingTop: 20,
    },
    container: {
        height: h,
        width: w,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        height: h,
        marginTop: 80,
        
      },
      topText:{
        //marginTop: 20,
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee',
      },
      calloutView: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 10,
        width: "40%",
        marginLeft: "30%",
        marginRight: "30%",
        marginTop: 20
      },
      calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0  
      },
      destinationInput :{
        height: 40,
        borderWidth:.5,
        marginTop:  50,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white'

      },
      predictionStyle: {
        backgroundColor: "white",
        padding: 5,
        fontSize: 18,
        borderWidth: .5,
        marginLeft: 5,
        marginRight: 5
      }
    
  });
  // These Fields will create a login form with three fields

  
  const fields = [
    {
      type: 'text',
      name: 'title',
      required: true,
      label: 'Title',
    },
    {
        type: 'text',
        name: 'desc',
        required: true,
        label: 'Desc. (optional)',
        props: {
            multiline: true,
        }
      },
      
    {
      type: 'date',
      name:'startTime',
      mode: 'datetime',
      //defaultValue: new Date(),
      required: false, 
      label: 'Start',
      minDate: new Date(),
    },
    {
        type: 'date',
        name:'endTime',
        mode: 'datetime',
        required: false, 
        label: 'End',
        minDate: new Date(),
    },
    {
      type: 'group',
      name: 'reccurrance',
      label: 'Repeat',
      fields: [
        {
          type: 'picker',
          name: 'freq',
          mode: 'dialog',
          defaultValue: 'Select',
          options: ['Select','Weekly', 'Monthly', 'Yearly'],
          required: false,
          //editable: false,
          label: 'Frequency (optional)'
        },
        {
          type: 'select',
          name: 'interval',
          label: 'By',
          defaultValue: 'SELECT',
          multiple: true,
          options: [],
        },
      ],
    },
    
    {
      type: 'text',
      name: 'location',
      required: false,
      //editable: false,
      label: 'Location (optional)'
    },

    // {
    //   type: 'picker',
    //   name: 'country',
    //   mode: 'dialog',
    //   label: 'Select Country',
    //   defaultValue: 'INDIA',
    //   options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
    // },
  ];