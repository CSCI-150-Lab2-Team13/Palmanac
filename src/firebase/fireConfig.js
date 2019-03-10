import firebase from 'react-native-firebase'



const config = {
    apiKey: "AIzaSyCbC-n--mjbOUSWOoTbjyxQcthtV7m5xhQ",
    authDomain: "scheduleapp-boof.firebaseapp.com",
    databaseURL: "https://scheduleapp-boof.firebaseio.com",
    projectId: "scheduleapp-boof",
    storageBucket: "scheduleapp-boof.appspot.com",
    messagingSenderId: "481998559301"
  };
  firebase.initializeApp(config);
  
  
  
  export default function initFirebase() {
    // Initialize Firebase
    firebase.initializeApp(config);
}