import { decorate, observable, action } from "mobx";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
  }

  addUser = (user) => {
    this.users.push(user);
  };

  empty() {
    this.users = [];
  }

  searchUser = (search) =>
    this.users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

  getUserById = (id) => this.users.find((user) => user.id === id);
}

decorate(UserStore, {
  users: observable,
  empty: action,
  addUser: action,
});

export default UserStore;
