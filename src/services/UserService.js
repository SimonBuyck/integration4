import "firebase/firestore";
import { userConverter } from "../models/User";

class UserService {
  constructor(firebase) {
    this.db = firebase.firestore();
  }

  create = async (user) => {
    return await this.db
      .collection("users")
      .doc(user.email)
      .withConverter(userConverter)
      .set(user);
  };

  getUserByEmail = async (email) => {
    const data = (await this.db.collection("users").doc(email).get()).data();
    if (!data.id) {
      data.id = data.userId; // quick fix to make it compatible with koens db
    }
    return data;
  };

  getAll = async () => {
    const snapshot = await this.db.collection("users").get();
    const users = snapshot.docs.map((o) => {
      return o.data();
    });
    return users;
  };

  getLikesForUser = async (user) => {
    const likes = await this.db
      .collection("users")
      .doc(user.email)
      .collection("likes")
      .get();
    return likes.docs.map((u) => u.data());
  };

  createLikeForUser = async (user, contactEmail) => {
    const contact = await this.getUserByEmail(contactEmail);
    if (!contact) {
      throw new Error(`User ${contactEmail} does not exist`);
    }
    await this.db
      .collection("users")
      .doc(user.email)
      .collection("likes")
      .doc(contact.email)
      .set(contact);

    return contact;
  };
}

export default UserService;
