import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class User {
  constructor({ id = v4(), store, ...json }) {
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.id = id;
    this.store = store;

    this.messages = [];
    this.groups = [];

    if (!json.avatar) {
      json.avatar = `https://avatars.dicebear.com/v2/avataaars/${this.id}.svg`;
    }
    this.updateFromJson(json);

    this.store.addUser(this);
  }

  create = async () => this.store.createUser(this.asJson);

  linkMessage(message) {
    !this.messages.includes(message) && this.messages.push(message);
  }

  unlinkMessage(message) {
    const index = this.messages.findIndex((test) => test.id === message.id);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }

  linkGroup(group) {
    !this.groups.includes(group) && this.groups.push(group);
    !group.users.includes(this) && group.linkUser(this);
  }

  unlinkGroup(group) {
    const index = this.groups.findIndex((test) => test.id === group.id);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
    group.users.includes(this) && group.unlinkUser(this);
  }

  updateFromJson = ({
    email = undefined,
    name = undefined,
    avatar = undefined,
    groups = undefined,
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.email = email !== undefined ? email : this.email;
    this.avatar = avatar !== undefined ? avatar : this.avatar;
    if (groups !== undefined) {
      const oldGroups = this.groups.concat();
      oldGroups.forEach((group) => group.unlinkUser(this));
      groups.forEach((group) => {
        this.store.rootStore.groupStore
          .updateGroupFromServer(group)
          .linkUser(this);
      });
    }
  };

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
    };
  }
}

decorate(User, {
  groups: observable,
  updateFromJson: action,
  asJson: computed,
});

export default User;
