import { decorate, observable, action } from "mobx";
import { v4 } from "uuid";
import Group from "./Group";
import User from "./User";

class Message {
  constructor({ id = v4(), content, user, unread = false, group, timestamp }) {
    if (!group) {
      throw new Error("A message must have a group");
    }
    if (!user) {
      throw new Error("A message must have a user");
    }
    if (!content || content === "") {
      throw new Error("A message must have some content");
    } 
    this.id = id;
    this.group = group;
    this.content = content;
    this.user = user;
    this.unread = unread;
    // this.group.linkMessage(this);
    // this.user.linkMessage(this);
    this.timestamp = timestamp;
  }

  setUnread(value) {
    this.unread = value;
  }
}

decorate(Message, {
  unread: observable,
  setUnread: action
});

const messageConverter = {
  toFirestore: function (message) {
    return {
      userId: message.user.id,
      groupId: message.group.id,
      msg: message.content,
      from: message.user.name,
      unread: message.unread,
      timestamp: message.timestamp,
      id: message.id,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    const parentGroup = snapshot.ref.parent.parent;
    const group = new Group({ id: parentGroup.id });
    const user = new User({ id: data.userId, name: data.from });
    return new Message({
      id: data.id,
      content: data.msg,
      user: user,
      group: group,
      unread: true,
      timestamp: data.timestamp,
    });
  },
};

export { messageConverter };

export default Message;
