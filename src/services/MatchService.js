import "firebase/firestore";
import { matchConverter } from "../models/Match";

class MatchService {
  constructor(firebase) {
    this.db = firebase.firestore();
  }

  listenToMatch = async (match, userStore, uiStore) => {
    return await this.db
      .collection("matches")
      .doc(`${match.id}`)
      .onSnapshot(function (doc) {
        const data = doc.data();
        if (data) {
          console.log(data);
          if(data.userId2){
            if(data.userId1){
              if (data.userId2 === uiStore.currentUser.id) {
                const user = userStore.getUserById(data.userId1);
                console.log(user);
                uiStore.currentUser.viewingUser = user;
              } else {
                match.userId2 = data.userId2;
                const user = userStore.getUserById(data.userId2);
                console.log(user);
                uiStore.currentUser.viewingUser = user;
              }
            }
          }
          if (data.accepted1 === "true" && data.accepted2 === "true") {
            console.log("match accepted");
            match.accepted1 = data.accepted1;
            match.accepted2 = data.accepted2;
          }
          if (data.accepted1 === "false" || data.accepted2 === "false") {
            console.log("match declined");
            match.accepted1 = data.accepted1;
            match.accepted2 = data.accepted2;
          }
          if (data.roomUrl !== undefined || data.roomUrl !== "") {
            match.roomUrl = data.roomUrl;
          }
        }
        return doc.data();
      });
  };

  updateMatch = async (match) => {
    if (match.userId2 !== "") {
      this.db.collection("matches").doc(match.id).set(
        {
          userId2: match.userId2,
        },
        { merge: true }
      );
    }
    if (match.accepted1 !== "") {
      this.db.collection("matches").doc(match.id).set(
        {
          accepted1: match.accepted1,
        },
        { merge: true }
      );
    }
    if (match.accepted2 !== "") {
      this.db.collection("matches").doc(match.id).set(
        {
          accepted2: match.accepted2,
        },
        { merge: true }
      );
    }
    if (match.roomUrl !== undefined || match.roomUrl !== "") {
      this.db.collection("matches").doc(match.id).set(
        {
          roomUrl: match.roomUrl,
        },
        { merge: true }
      );
    }
  };

  deleteMatch = async (match) => {
    await this.db.collection("matches").doc(match.id).delete();
  };

  getMatch = async (currentUser) => {
    const snapshot = await this.db
      .collection("matches")
      .where("userId2", "==", "")
      .get();
    snapshot.docs.map((o) => {
      return o.data();
    });
    const matches = [];
    snapshot.docs.map((m) =>
      m.userId1 === currentUser.id ? console.log(m) : matches.push(m.data())
    );
    console.log(currentUser.id);
    console.log(matches);
    return matches;
  };

  getById = async (id) => {
    return (await this.db.collection("matches").doc(id).get()).data();
  };

  create = async (match) => {
    return await this.db
      .collection("matches")
      .doc(match.id)
      .withConverter(matchConverter)
      .set(match);
  };

  getMatchesForUser = async (userId) => {
    const matches = []
    const matches1 = await this.db.collection('matches').where('userId1', '==', userId).get();
    matches1.docs.map(m => m.data().accepted1 === 'true' && m.data().accepted2 === 'true' ? matches.push(m.data()) : '')
    console.log(matches1)
    const matches2 = await this.db.collection('matches').where('userId2', '==', userId).get();
    matches2.docs.map(m => m.data().accepted1 === 'true' && m.data().accepted2 === 'true' ? matches.push(m.data()) : '')
    console.log(matches2)
    console.log(matches)
    return matches;
  }
}

export default MatchService;
