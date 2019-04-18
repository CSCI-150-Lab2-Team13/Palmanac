    
import { observable, action } from 'mobx'
import firebase from 'react-native-firebase'

class AuthStore{
    @observable isLoggedIn = true;

@action
    setUser() {
      this.isLoggedIn = true;
    }
@action
    unsetUser(){
      this.isLoggedIn = false;
    }
@action
    getUserStatus(){
      return this.isLoggedIn;
    }
  }
export default AuthStore