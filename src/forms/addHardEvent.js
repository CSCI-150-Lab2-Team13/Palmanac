import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import _ from 'lodash';

// TODO: Add check if predictions != [] to prevent incorrect locations
//       Add Selection of Calendar
//       Add Selection of Invitees
//       Add Selection of Group
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

    onValueChange(){
     // if (name == 'location'){
      const formValues = this.formGenerator.getValues();
      if (formValues.location != '' || (this.state.placeId == '' && this.state.destination != '') ){
        this.onChangeDestinationDebounced(formValues.location)
      }
      else if(this.state.placeId != '' && formValues.location == ''){
        this.setState({
          placeId: '',
          placeDetails: '',
          predictions: []
        });
      }


      //}
    }


    create() {
      const formValues = this.formGenerator.getValues();
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
        label: 'Desc.',
        props: {
            multiline: true,
        }
      },
      
    {
      type: 'date',
      name:'startTime',
      mode: 'datetime',
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
      type: 'text',
      name: 'location',
      required: false,
      //editable: false,
      label: 'Location'
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