import { decorate, observable, action } from "mobx";

class MatchStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.matches = [];
    
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
