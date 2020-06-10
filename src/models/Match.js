import { v4 } from "uuid";
import { decorate, observable, action } from "mobx";

class Match {
  constructor({ id = v4(), creator, match = false, date, accepted, users = [], store }) {
    this.id = id;
    this.creator = creator;
    this.match = match;
    this.date = date;
    this.accepted = accepted;
    this.users = users;
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store;
    this.store.addMatch(this);
  }
}

decorate(Match, {
  accepted: observable,
  date: observable,
  setMatch: action,
});

export default Match;
