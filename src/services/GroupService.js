import "firebase/firestore";
import { userConverter } from "../models/User";
import { groupConverter } from "../models/Group";
import { messageConverter } from "../models/Message";

class GroupService {
  constructor(firebase) {
    this.db = firebase.firestore();
  }
  /*ADDED DIY */
  create = async (group) => {
    const groupRef = await this.db.collection("groups").doc();
    await groupRef.withConverter(groupConverter).set(group);
    return groupRef; 
  };

  createMessage = async (message) => {
    return await this.db
      .collection("groups")
      .doc(message.group.id)
      .collection("messages")
      .doc()
      .withConverter(messageConverter)
      .set(message);
  };

  getMessages = async (groupId, onChange) => {
    await this.db
      .collectionGroup("messages")
      .where("groupId", "==", groupId)
      .orderBy("timestamp")
      .withConverter(messageConverter)
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const messageObj = change.doc.data();
            onChange(messageObj);
          }
        });
      });
  };

  getGroupsForMember = async (userId, onChange) => {
    await this.db
      .collectionGroup("members")
      .where("userId", "==", userId)
      .withConverter(userConverter)
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const groupID = change.doc.ref.parent.parent.id;
            const group = await this.getGroup(groupID);
            const groupObj = group.data();
            const members = await this.getMembersFromGroup(groupID);
            for (const member of members.docs) {
              const memberObj = member.data();
              memberObj.linkGroup(groupObj);
              groupObj.linkUser(memberObj);
            }
            onChange(groupObj);
          }
        });
      });
  };

  getGroup = async (groupId) => {
    return await this.db
      .collection("groups")
      .doc(groupId)
      .withConverter(groupConverter)
      .get();
  };

  addMemberToGroup = async (groupId, member) => {
    return await this.db
      .collection("groups")
      .doc(groupId)
      .collection("members")
      .doc()
      .withConverter(userConverter)
      .set(member);
  };

  getMembersFromGroup = async (groupId) => {
    return await this.db
      .collection("groups")
      .doc(groupId)
      .collection("members")
      .withConverter(userConverter)
      .get();
  };
}
export default GroupService;
