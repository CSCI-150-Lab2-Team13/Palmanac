import {configure } from 'mobx'


import UserStore from './userStore';
import MessageStore from './messageStore';
import AuthStore from './authStore'

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
    this.authStore = new AuthStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;