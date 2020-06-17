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

  onAuthStateChanged = (user) => {
    if (user) {
      console.log(`De user is ingelogd: ${user.email}, ${user.uid}`);
      console.log(user);
      this.setCurrentUser(
        new User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          store: this.rootStore.userStore,
        })
      );
      console.log(`De user is ingelogd: ${this.currentUser.email}, ${this.currentUser.id}`);
      this.rootStore.userStore.getAll(this.currentUser);

      // //inlezen van de contacten van de currentuser
      // this.rootStore.userStore.getContactsForUser();
    } else {
      console.log(`De user is uitgelogd.`);
      this.rootStore.userStore.empty();
      this.rootStore.matchStore.empty();
      this.setCurrentUser(undefined);
    }
  };

  loginUser = async (user) => {
    //service aanspreken
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
