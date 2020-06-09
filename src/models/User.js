import { v4 } from "uuid";
import { decorate, observable } from "mobx";

class User {
  constructor({
    id = v4(),
    name,
    country,
    video,
    dance,
    password,
    partnerId = "",
    duo = false,
    email,
    viewingUser = 0,
    matches = [],
    store,
  }) {
    this.id = id;
    this.name = name;
    this.country = country;
    if (!video) {
      throw new Error("voorzie een video");
    }
    this.video = video;
    this.dance = dance;
    this.partnerId = partnerId;
    this.duo = duo;
    if (partnerId !== "") {
      this.duo = true;
    }
    this.password = password;
    this.email = email;
    this.viewingUser = viewingUser;
    this.matches = matches;
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store;
    this.store.addUser(this);
  }

  linkMatch(match) {
    !this.matches.includes(match) && this.matches.push(match);
    !match.userId.includes(this) && match.linkUser(this);
  }

  setViewingUser(amount){
    this.viewingUser = amount;
  }
}

decorate(User, {
  video: observable,
  dance: observable,
  partnerId: observable,
  duo: observable,
  password: observable,
  viewingUser: observable,
  matches: observable,
})

export default User;
