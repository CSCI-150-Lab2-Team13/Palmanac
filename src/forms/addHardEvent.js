import React, { Component } from 'react';
import { AppRegistry, ScrollView } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const h = 400;
const w = 400;
const ASPECT_RATIO = w / h;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class HardEventFormView extends Component {
    create() {
      const formValues = this.formGenerator.getValues();
      console.log('FORM VALUES', formValues);
    }
    constructor() {
      super();
      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      };
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

    render() {
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
            />
              <MapView
                provider={ PROVIDER_GOOGLE }
                style={ styles.map }
               // customMapStyle={  }
                showsUserLocation={ true }
                region={ this.state.region }
               // onRegionChange={ region => this.setState({region}) }
               // onRegionChangeComplete={ region => this.setState({region}) }
                ></MapView>

          </View>

          <View style={styles.submitButton}>


            <Button block onPress={() => this.login()}>
              <Text>Create Event</Text>
            </Button>
          </View>
        </ScrollView>
      );
    }
  }
   
  //AppRegistry.registerComponent('HardEventFormView', () => HardEventFormView);


  const styles = {
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
    
  };
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

    }
    // {
    //   type: 'picker',
    //   name: 'country',
    //   mode: 'dialog',
    //   label: 'Select Country',
    //   defaultValue: 'INDIA',
    //   options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
    // },
  ];