import { decorate, observable, action } from "mobx";
import MatchService from "../services/MatchService";

class MatchStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.matchService = new MatchService(rootStore.firebase);
    this.matches = [];
    this.openMatches = [];
  }

  listenToMatch = async (match) => {
    const updatedMatch = await this.matchService.listenToMatch(
      match,
      this.rootStore.userStore,
      this.rootStore.uiStore.currentUser
    );
    return updatedMatch;
  };

  updateMatch = (match) => {
    this.matchService.updateMatch(match);
  };

  deleteMatch = (match) => {
    this.matchService.deleteMatch(match);
  };

  getMatches = async (currentUser) => {
    const matches = await this.matchService.getMatch(currentUser);
    console.log(matches);
    return matches;
  };

  createMatch = async (match) => {
    return await this.matchService.create(match);
  };

  addMatch = async (match) => {
    this.matches.push(match);
  };

  empty() {
    this.matches = [];
  }

  getMatchByMatchId = (id) =>
    this.matches.user.map((user) => user.find((user) => user.id === id));
}

decorate(MatchStore, {
  matches: observable,
  empty: action,
  addMatch: action,
});

export default MatchStore;
