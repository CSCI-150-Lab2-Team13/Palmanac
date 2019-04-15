import { observable } from 'mobx';

class AuthStore{
    @observable isLoggedIn = true;

    
    setUser() {
      this.isLoggedIn = true;
    }

    unsetUser(){
      this.isLoggedIn = false;
    }

    getUserStatus(){
      return this.isLoggedIn;
    }
}
export default AuthStore;