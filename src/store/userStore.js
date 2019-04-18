    
import React from 'react';
import { observable, action, computed } from 'mobx'
import { Document } from 'firestorter'




class UserStore {

  constructor(rootStore) {
    this.user = new Document()
  }

@action setUser = path => {
  if(this.user.path !== path)
  {
    this.user.path = path;
  }
} 

}


export default UserStore
