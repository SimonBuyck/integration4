import { decorate, observable, action } from "mobx";
import AuthService from "../services/AuthService";
import User from "../models/User";
import Match from "../models/Match";

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.authService = new AuthService(
      this.rootStore.firebase,
      this.onAuthStateChanged
    ); 
  }

  createMatch = (match) => {
    const newMatch = new Match({
      store: match.store,
      userId1: match.userId1,
    });
    this.rootStore.matchStore.createMatch(newMatch)
    return newMatch;
  }

  isRegisteredContact = async (user) => {
    return this.authService.isRegistered(user.email);
  };

  onAuthStateChanged = async (user) => {
    if (user) {
      this.setCurrentUser(
        new User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          store: this.rootStore.userStore,
        })
      );
      const newUser = await this.rootStore.userStore.getUserByEmail(this.currentUser.email);
      const loggedInUser = new User({ store: this.rootStore.userStore ,...newUser})
      console.log('login user : ', loggedInUser.name)
      this.setCurrentUser(loggedInUser);
      this.rootStore.userStore.getAll(this.currentUser);
      this.rootStore.matchStore.getMatchesForUser(this.currentUser.id);
    } else {
      console.log(`De user is uitgelogd.`);
      this.rootStore.userStore.empty();
      this.rootStore.matchStore.empty();
      this.setCurrentUser(undefined);
    }
  };

  loginUser = async (user) => {
    const result = await this.authService.login(user.email, user.password);
    return result; 
  };
  logoutUser = async () => {
    const result = await this.authService.logout();
    return result;
  };
  registerUser = async (user) => {
    const result = await this.authService.register(
      user.name,
      user.email,
      user.password
    );
    const newRegisteredUser = new User({
      id: result.uid,
      name: result.displayName,
      store: this.rootStore.userStore,
      email: result.email,
      video: user.video,
      country: user.country,
      viewingUser: user.viewingUser,
      dance: user.dance,
      duo: user.duo,
      partner: user.partner,
    });
    if (result) {
      //user toevoegen aan onze users collection
      this.rootStore.userStore.createUser(newRegisteredUser);
    }

    return result;
  };

  setCurrentUser(user) {
    this.currentUser = user;
  }
}

decorate(UiStore, {
  currentUser: observable,
  setCurrentUser: action,
});

export default UiStore;
