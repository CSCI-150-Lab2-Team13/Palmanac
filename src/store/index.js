import {configure } from 'mobx'


import SessionStore from './sessionStore';
import UserStore from './userStore';
import MessageStore from './messageStore';
import AuthStore from './authStore';

configure({ enforceActions: 'always'})
class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
    this.authStore = new AuthStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;