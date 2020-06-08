import { v4 } from "uuid";

class User {
  constructor({
    id = v4(),
    name,
    country,
    video,
    dance,
    password,
    email,
    matches = [],
    store,
  }) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.video = video;
    this.dance = dance;
    this.password = password;
    this.email = email;
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
}

export default User;
