import { v4 } from "uuid";

class Match {
  constructor({
    id = v4(),
    date,
    accepted,
    users = [],
    store,
  }) {
    this.id = id;
    this.date = date;
    this.accepted = accepted;
    this.users = users;
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

export default Match;
