import { v4 } from "uuid";
import { decorate, observable } from "mobx";

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
    this.store.addMatch(this);
  }

  linkMatch(match) {
    !this.matches.includes(match) && this.matches.push(match);
    !match.userId.includes(this) && match.linkUser(this);
  }
}

decorate(Match, {
  accepted: observable,
  date: observable
});

export default Match;
