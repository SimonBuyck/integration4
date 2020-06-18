import { decorate, observable, action } from "mobx";
import MatchService from "../services/MatchService";

class MatchStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.matchService = new MatchService(rootStore.firebase)
    this.matches = [];
    this.openMatches = []
  }

  updateMatch = (match) => {
    this.matchService.updateMatch(match)
  }

  deleteMatch = (match) => {
    this.matchService.deleteMatch(match)
  }

  getMatches = async() => {
    const matches = await this.matchService.getMatch();
    console.log(matches)
    return matches
  }

  createMatch = async (match) => {
    console.log(match)
    return await this.matchService.create(match);
  }

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
