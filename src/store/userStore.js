import { observable, action, computed } from 'mobx';

class UserStore {
  @observable users = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUsers = users => {
    this.users = users;
  };

  @action setUser = (user, displayname) => {
    if (!this.users) {
      this.users = {};
    }

    this.users[displayname] = user;
  };

  @computed get userList() {
    return Object.keys(this.users || {}).map(key => ({
      ...this.users[displayname],
      displayname: key,
    }));
  }
}

export default UserStore;