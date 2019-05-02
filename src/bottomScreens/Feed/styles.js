import {
    StyleSheet
  } from 'react-native';

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