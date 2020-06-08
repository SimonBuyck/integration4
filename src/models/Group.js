import { decorate, observable, action, computed } from "mobx";
import { v4 } from "uuid";

class Group {
  constructor({
    id = v4(),
    name,
    messages = [],
    pic = "",
    users = [],
    store,
    ownerId,
    creationDate
  }) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.pic = pic;
    if (!pic) {
      this.pic = `https://avatars.dicebear.com/v2/identicon/${this.id}.svg`;
    }
    this.users = users;
    // if (!store) {
    //   throw new Error("voorzie een store");
    // }
    this.store = store;
    // this.store.addGroup(this);
    // this.users.forEach((user) => {
    //   user.linkGroup(this);
    // });





    this.creationDate = creationDate;
    this.ownerId = ownerId;
  }

  linkMessage(message) {
    !this.messages.includes(message) && this.messages.push(message);
  }

  linkUser(user) {
    !this.users.includes(user) && this.users.push(user);
    !user.groups.includes(user) && user.linkGroup(this);
  }

  get unreadLength() {
    return this.messages.filter((message) => message.unread).length;
  }

  get lastMessageContent() {
    return this.messages.length > 0
      ? this.messages[this.messages.length - 1].content
      : "";
  }
}

decorate(Group, {
  messages: observable,
  users: observable,
  addMessage: action,
  unreadLength: computed,
  lastMessageContent: computed,
  linkUser: action,
  linkMessage: action
});
const groupConverter = {
  toFirestore: function(group) {
    return {
      name: group.name,
      pic: group.pic,
      ownerId: group.ownerId,
      creationDate: group.creationDate
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Group({
      id: snapshot.id,
      name: data.name,
      pic: data.pic,
      ownerId: data.ownerId,
      creationDate: data.creationDate
    });
  }
};

export { groupConverter };
export default Group;
