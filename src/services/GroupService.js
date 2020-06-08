import "firebase/firestore";

class GroupService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  getAll = async () => {
    const snapshot = await this.db.collection("groups").get();
    return snapshot.docs.map((o) => o.data());
  };

  getById = async (id) => {
    return (await this.db.collection("groups").doc(id).get()).data();
  };

  create = async (group) => {
    const groupRef = await this.db.collection("groups").doc(group.id);
    await groupRef.set(group);
    return group;
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
      .collectionGroup("messages")
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

  getMembersForGroup = async (groupId) => {
    const members = await this.db
      .collection("groups")
      .doc(groupId)
      .collection("members")
      .get();
    return members.docs.map((u) => u.data());
  };

  addMemberToGroup = async (groupId, user) => {
    console.log("add", user.name, " to ", groupId);
    const group = await this.getById(groupId);
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`);
    }
    return await this.db

      .collection("groups")
      .doc(groupId)
      .collection("members")
      .doc()
      .set(user);
  };
}

export default GroupService;
