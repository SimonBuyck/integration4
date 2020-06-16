import { decorate, observable, action } from "mobx";
import UserService from "../services/UserService";
import User from "../models/User";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService(rootStore.firebase);
    this.users = [];
  }

  createUser = async (user) => {
    return await this.userService.create(user);
  };

  getAll = async () => {
    const users = await this.userService.getAll();
    users.map((u) => u.id !== this.rootStore.uiStore.currentUser.id ? new User({ store: this, ...u }): console.log('this is the current user'));
  };

  createLikeForUser = async (user, contactEmail) => {
    this.userService.createLikeForUser(user, contactEmail);
  };

  addUser = (user) => {
    this.users.push(user);
  };

  empty() {
    this.users = [];
  }

  searchUser = (search, groupMembers) => {
    const intersection = [];
    for (const member of groupMembers) {
      for (const user of this.users) {
        if (user.id === member.id) {
          intersection.push(user);
        }
      }
    }
    const uniques = this.users.filter(
      (obj) => intersection.indexOf(obj) === -1
    );
    const searchResult = uniques.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    return searchResult;
  };

  getUserById = (id) => this.users.find((user) => user.id === id);
}

decorate(UserStore, {
  users: observable,
  otherUsers: observable,
  getAll: action,
  searchUser: action,
  getUserById: action,
  createUser: action,
  empty: action,
  addUser: action,
});

export default UserStore;
