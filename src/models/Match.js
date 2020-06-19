import { v4 } from "uuid";
import { decorate, observable, action } from "mobx";

class Match {
  constructor({ id = v4(), accepted1 = '', accepted2 = '', userId1, userId2 = '', roomUrl = '', store }) {
    this.id = id;
    this.accepted1 = accepted1;
    this.accepted2 = accepted2
    this.userId1 = userId1;
    this.userId2 = userId2;
    this.roomUrl = roomUrl
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store;
    this.store.addMatch(this);
    if(accepted1 && accepted2 === 'true'){
      this.linkUser(userId1);
      this.linkUser(userId2);
    }
  }

  linkUser= (user) => {
    !this.user.includes(user) && this.user.push(user);
    !user.match.includes(this) && user.linkMatch(this);
  }
}

const matchConverter = {
  toFirestore: function (match) {
    return {
      matchId: match.id,
      userId1: match.userId1,
      userId2: match.userId2,
      accepted1: match.accepted1,
      accepted2: match.accepted2,
      roomUrl: match.roomUrl,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Match({
      id: data.matchId,
      userId1: data.userId1,
      userId2: data.userId2,
      accepted1: data.accepted1,
      accepted2: data.accepted2,
      roomUrl: data.roomUrl,
    });
  },
};

decorate(Match, {
  userId2: observable,
  accepted1: observable,
  accepted2: observable,
  roomUrl: observable,
  linkUser: action,
});

export { matchConverter };
export default Match;
