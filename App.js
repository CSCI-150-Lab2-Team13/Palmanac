import React from 'react';
import  { Provider } from 'mobx-react'

import store from './src/store'

import App from './src/routing/App'
import Firebase, {FirebaseContext} from './src/firebase'


export default class AppStart extends React.Component {
    constructor(props) {
      super(props);
      
     
  }
    render() {
      return (
        <Provider {...store}>
        <FirebaseContext.Provider value={new Firebase()}>
          <App />
        </FirebaseContext.Provider>
      </Provider>
        
      );
    }
  }
  