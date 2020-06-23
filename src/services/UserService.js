import "firebase/firestore";
import { userConverter } from "../models/User";

class UserService {
  constructor(firebase) {
    this.db = firebase.firestore();
  }

  changeStatus = (user, status) => {
    user.status = status;
    return this.db.collection("users").doc(user.email).set(
      {
        status: status,
      },
      { merge: true }
    );
  };

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
    return snapshot.docs.map((o) => {
      return o.data();
    });
  };

  getMatchesForUser = async (user) => {
    const likes = await this.db
      .collection("users")
      .doc(user.email)
      .collection("matches")
      .get();
    return likes.docs.map((u) => u.data());
  };

  createMatchForUser = async (user, contactEmail) => {
    const contact = await this.getUserByEmail(contactEmail);
    if (!contact) {
      throw new Error(`User ${contactEmail} does not exist`);
    }
    await this.db
      .collection("users")
      .doc(user.email)
      .collection("matches")
      .doc(contact.email)
      .set(contact);

    return contact;
  };
}

export default UserService;
