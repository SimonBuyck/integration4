import { decorate, observable, action } from "mobx";
import UserService from "../services/UserService";
import User from "../models/User";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService(rootStore.firebase);
    this.users = [];
    this.onlineUsers = [];
  }

  changeStatus = (user, status) => {
    this.userService.changeStatus(user, status);
  };

  createUser = async (user) => {
    return await this.userService.create(user);
  };

  getUserByEmail = async (email) => {
    return await this.userService.getUserByEmail(email);
  }

  getAll = async (currentUser) => {
    const users = await this.userService.getAll();
    users.map((u) =>
      u.userId === currentUser.id
        ? u
        : new User({ store: this, id: u.userId, ...u })
    );
  };

  addUser = (user) => {
    this.users.push(user);
  };

  empty() {
    this.users = [];
  }

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
