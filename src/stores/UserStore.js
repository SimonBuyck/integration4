import { decorate, observable, action } from "mobx";
import UserService from "../services/UserService";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService(rootStore.firebase);
    this.users = [];
  }

  createUser = async (user) => {
    return await this.userService.create(user);
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
  empty: action,
  addUser: action,
});

export default UserStore;
