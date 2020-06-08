import "firebase/firestore";
import { userConverter } from "../models/User";

class UserService {
  constructor(firebase) {
    this.db = firebase.firestore();
  }

  getUserByEmail = async (email) => {
    return await this.db
      .collection("users")
      .doc(email)
      .withConverter(userConverter)
      .get();
  };

  getContactsByUser = async (user) => {
    const contactsRef = this.db
      .collection("users")
      .doc(user.email)
      .collection("contacts");

    const contacts = await contactsRef.withConverter(userConverter).get();

    return contacts.docs.map((contact) => contact.data());
  };

  createContact = async (newUser, currentUser) => {
    const fsUser = await this.getUserByEmail(newUser.email);
    const fsUserObj = fsUser.data();

    const contactsRef = this.db
      .collection("users")
      .doc(currentUser.email)
      .collection("contacts");

    await contactsRef
      .doc(fsUserObj.email)
      .withConverter(userConverter)
      .set(fsUserObj);
    return fsUserObj;
  };

  create = async (user) => {
    return await this.db
      .collection("users")
      .doc(user.email)
      .withConverter(userConverter)
      .set(user);
  };
}

export default UserService;
