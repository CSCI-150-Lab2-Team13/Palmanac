import React, { Component } from 'react';
import { AppRegistry, ScrollView } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class HardEventFormView extends Component {
    create() {
      const formValues = this.formGenerator.getValues();
      console.log('FORM VALUES', formValues);
    }
    // declare this outside of render


    render() {
        var region = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
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
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                    initialRegion={region}
                />
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
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        height: 400,
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