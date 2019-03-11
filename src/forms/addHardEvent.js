import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import _ from 'lodash';
import { RRule, RRuleSet, rrulestr } from 'rrule'

// TODO: Add check if predictions != [] to prevent incorrect locations
//       Add Selection of Calendar
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
      };
      this.onValueChange = this.onValueChange.bind(this);
      this.onChangeDestinationDebounced = _.debounce(this.onChangeDestination, 750)
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

      var rec_index;
      var freq_index;
      var interval_index;
      var fields = this.formGenerator.props['fields'];
      // _.set(this.formGenerator)
      for(let i = 0, l = fields.length; i < l; i++) {
        if( fields[i]['name'] == 'reccurrance'){
          rec_index = i;
          break;
        }
      }

      var data = fields[rec_index]['fields'];

      for(let i = 0, l = data.length; i < l; i++) {
        if( data[i]['name'] == 'freq')
          freq_index = i;
        if(data[i]['name'] == 'interval')
          interval_index = i;
      }

      var freq = data[freq_index]
      var interval = data[interval_index]

      var days = [
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
      var months = [
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
      // NOTE: VERY IMPORTANT
      // Originally only used for debugging, but this function call is
      // actually necessary for onValueChange to display properly
      // this seems to allow onValueChange to update before exiting
      // which does not happen otherwise
      this.setState({
        error: JSON.stringify(interval.value)
     })

      //Show fields based on which value is filled in
      if(freq.value != "Select"){
        // Unhide selected value corresponding form


        var found_days = false;
        var found_months = false;
        if(interval.type != "date" && interval.value){
         for(let i = 0, l = days.length; i < l; i++) {
            if(days[i].id == interval.value.id){
              found_days = true;
            }
         } 
         for(let i = 0, l = months.length; i < l; i++) {
           if(months[i].id == interval.value.id){
             found_months = true;
           }
        }
      }


        freq.required = true;
        if(freq.value == "Weekly"){
          if( found_months ||  interval.type == "date"){
            interval.value = "";
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
            interval.value = "";
          }
          //
          
          interval.type = 'select';       
          interval.objectType = true;
          interval.labelKey = 'name';
          interval.primaryKey = 'id';
          interval.options = months;

          interval.hidden = false;

          //interval.multiple = true;
        }
        
        else if(freq.value == "Yearly"){

          if(found_days || found_months ){
            interval.value = new Date();
          }
          

          
          interval.type = "date";
          interval.mode = 'date';
          interval.hidden = false;
          
        }
      }
      else{
        freq.required = false;
        // Set all value to hidden
        interval.hidden = true;
      }
      

    }


    create() {
      const formValues = this.formGenerator.getValues();
      
      if (formValues.freq != ""){

      }

      console.log('FORM VALUES', formValues);
    }

    // declare this outside of render
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
        },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
        }
      );
    }
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
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
      required: true, 
      label: 'Start',
    },
    {
        type: 'date',
        name:'endTime',
        mode: 'datetime',
        required: true, 
        label: 'End',
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
          type: 'picker',
          name: 'interval',
          label: 'By',
          defaultValue: 'SELECT',
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