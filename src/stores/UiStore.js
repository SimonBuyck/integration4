import { decorate, observable, action } from "mobx";
import AuthService from "../services/AuthService";
import User from "../models/User";

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.authService = new AuthService(
      this.rootStore.firebase,
      this.onAuthStateChanged
    );
  }

  isRegisteredContact = async (user) => {
    return this.authService.isRegistered(user.email);
  };

  onAuthStateChanged = (user) => {
    if (user) {
      console.log(`De user is ingelogd: ${user.email}`);
      console.log(user);
      this.setCurrentUser(
        new User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          store: this.rootStore.userStore,
          video: user.video,
        })
      );
      // //inlezen van de groepen
      // this.rootStore.groupStore.getGroups();

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
      user.password,
      user.video
    );
    const newRegisteredUser = new User({
      id: result.uid,
      name: result.displayName,
      video: result.video,
      store: this.rootStore.userStore,
      email: result.email,
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
