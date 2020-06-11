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
    partner = "",
    duo = false,
    email,
    viewingUser = 0,
    matches = [],
    likes = [],
    store,
  }) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.video = video;
    this.dance = dance;
    this.duo = duo;
    this.partner = partner;
    this.password = password;
    this.email = email;
    this.viewingUser = viewingUser;
    this.matches = matches;
    this.likes = likes;
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store;
    this.store.addUser(this);
    this.matches.map(match => match.linkUser(this))
  }

  linkMatch(match) {
    !this.matches.includes(match) && this.matches.push(match);
    !match.users.includes(this) && match.linkUser(this);
  }

  setViewingUser(amount){
    this.viewingUser = amount;
  }

  
};

const userConverter = {
  toFirestore: function(user) {
    return {
      userId: user.id,
      name: user.name,
      video: user.video,
      email: user.email,
      country: user.country,
      dance: user.dance,
      viewingUser: user.viewingUser,
      partner: user.partner,
      duo: user.duo
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new User({
      dance: data.dance,
      viewingUser: data.viewingUser,
      partner: data.partner,
      duo: data.duo,
      country: data.country,
      name: data.name,
      email: data.email,
      video: data.video,
      id: data.userId
    });
  }
}

decorate(User, {
  video: observable,
  dance: observable,
  partner: observable,
  duo: observable,
  password: observable,
  viewingUser: observable,
  matches: observable,
})

export {userConverter}
export default User;
