import { decorate, observable, action } from "mobx";

class MatchStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.matches = [];
  }

  linkMatch(match) {
    !this.matches.includes(match) && this.matches.push(match);
    !match.users.includes(this) && match.linkUser(this);
  }

  addMatch = (match) => {
    this.matches.push(match);
  };

  empty() {
    this.matches = [];
  }

  getUserByUserId = (id) =>
    this.matches.user.map((user) => user.find((user) => user.id === id));
}

decorate(MatchStore, {
  users: observable,
  empty: action,
  addMatch: action,
});

export default MatchStore;
