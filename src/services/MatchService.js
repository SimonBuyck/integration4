import "firebase/firestore";
import { matchConverter } from "../models/Match";

class MatchService {
  constructor(firebase) {
    this.db = firebase.firestore();
  }

  listenToMatch = async (match, userStore, currentUser) => {
    return await this.db
      .collection("matches")
      .doc(`${match.id}`)
      .onSnapshot(function (doc) {
        const data = doc.data();
        if(data){
          if (data.userId2) {
            const user = userStore.getUserById(data.userId2);
            currentUser.viewingUser = user;
          }
          if(data.accepted1 && data.accepted2 === 'true'){
            console.log('match accepted')
            match.accepted1 = data.accepted1;
            match.accepted2 = data.accepted2;
          }
        }
        return doc.data();
      });
  }

  updateMatch = async (match) => {
    if(match.userId2 !== ''){
      this.db.collection("matches").doc(match.id).set(
        {
          userId2: match.userId2
        },
        { merge: true }
      );
    }
    if(match.accepted1 !== ''){
      this.db.collection("matches").doc(match.id).set(
        {
          accepted1: match.accepted1
        },
        { merge: true }
      );
    }
    if(match.accepted2 !== ''){
      this.db.collection("matches").doc(match.id).set(
        {
          accepted2: match.accepted2
        },
        { merge: true }
      );
    }
  }

  deleteMatch = async (match) => {
    await this.db.collection("matches").doc(match.id).delete()
  }

  getMatch = async () => {
    const snapshot = await this.db
      .collection("matches")
      .where("userId2", "==", "")
      .get();
    return snapshot.docs.map(o => {return o.data()});
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

  getGroupsForUser = async (userId, onGroupAdded) => {
    return await this.db
      .collectionGroup("members")
      .where("id", "==", userId)
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const groupId = change.doc.ref.parent.parent.id;
            onGroupAdded(groupId);
          }
        });
      });
  };

  getMessagesForGroup = async (groupId, onMessageAdded) => {
    this.db
      .collectionGroup("matches")
      .where("groupId", "==", groupId)
      .orderBy("timestamp")
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          console.log(change);
          if (change.type === "added") {
            onMessageAdded(change.doc.data());
          }
        });
      });
  };

  getUsersForMatch = async (matchId) => {
    const members = await this.db
      .collection("matches")
      .doc(matchId)
      .collection("users")
      .get();
    return members.docs.map((u) => u.data());
  };

  addUserToMatch = async (matchId, user) => {
    console.log("add", user.name, " to ", matchId);
    const match = await this.getById(matchId);
    if (!match) {
      throw new Error(`Group ${matchId} does not exist`);
    }
    return await this.db

      .collection("matches")
      .doc(matchId)
      .collection("users")
      .doc()
      .set(user);
  };
}

export default MatchService;
