import { decorate, observable, action } from "mobx";
import UserService from "../services/UserService";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService(this.rootStore.firebase);
    this.users = [];
  }

  getContactsForUser = async () => {
    const contactArr = await this.userService.getContactsByUser(
      this.rootStore.uiStore.currentUser
    );
    contactArr.forEach(this.addUser);
  };

  createContact = async (user) => {
    const registered = await this.rootStore.uiStore.isRegisteredContact(user);

    if (registered === true) {
      const newContact = await this.userService.createContact(
        user,
        this.rootStore.uiStore.currentUser
      );
      this.addUser(newContact);
    } else {
      throw new Error("user not exist");
    }
  };

  createUser = async (user) => {
    return await this.userService.create(user);
  };

  addUser = user => {
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
    const uniques = this.users.filter(obj => intersection.indexOf(obj) === -1);
    const searchResult = uniques.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    return searchResult;
  };

  getUserById = id => this.users.find(user => user.id === id);
}

decorate(UserStore, {
  users: observable,
  empty: action,
  addUser: action
});

export default UserStore;
