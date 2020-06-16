import "firebase/firestore";

class MatchService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  getAll = async () => {
    const snapshot = await this.db.collection("matches").get();
    return snapshot.docs.map((o) => o.data());
  };

  getById = async (id) => {
    return (await this.db.collection("matches").doc(id).get()).data();
  };

  create = async (match) => {
    const groupRef = await this.db.collection("matches").doc(match.id);
    await groupRef.set(match);
    return match;
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
