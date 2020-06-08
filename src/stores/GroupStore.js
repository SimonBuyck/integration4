import { decorate, observable, action, computed } from "mobx";
import GroupService from "../services/GroupService";
import { getCurrentTimeStamp } from ".";

class GroupStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.groupService = new GroupService(this.rootStore.firebase);
    this.groups = [];
  }

  addContactToGroup = async (contact, group) => {
    await this.groupService.addMemberToGroup(group.id, contact);
  };

  onGroupsChanged = (group) => {
    this.addGroup(group);
  };

  getGroups = async () => {
    const result = this.groupService.getGroupsForMember(
      this.rootStore.uiStore.currentUser.id,
      this.onGroupsChanged
    );
    console.log(result);
  };

  createGroup = async (group) => {
    group.creationDate = getCurrentTimeStamp();
    group.ownerId = this.rootStore.uiStore.currentUser.id;
    const newGroupRef = await this.groupService.create(group);
    group.id = newGroupRef.id;
    await this.groupService.addMemberToGroup(
      group.id,
      this.rootStore.uiStore.currentUser
    );
    return group;
  };

  getGroupById = (id) => this.groups.find((group) => group.id === id);
  
  sendMessage = async (message) => {
    message.timestamp = getCurrentTimeStamp();
    return await this.groupService.createMessage(message);
  };

  onMessageChanged = async message => {
    const group = this.getGroupById(message.group.id);
    group.linkMessage(message);
    //CASE 1: de message is van de currentuser
    if (message.user.id === this.rootStore.uiStore.currentUser.id) {
      this.rootStore.uiStore.currentUser.linkMessage(message);
    } else {
      //CASE 2: de message is van een contact
      const fromContact = this.rootStore.userStore.getUserById(message.user.id);
      if (fromContact) {
        fromContact.linkMessage(message);
      } else {
        //CASE 3: de message is van een "niet contact"
        //niets doen
      }
    } 
  };

  addGroup = group => {
    let groupExist = this.groups.findIndex(item => item.id === group.id);
    if (groupExist === -1) {
      this.groups.push(group);
      //listen for message changes
      this.groupService.getMessages(group.id, this.onMessageChanged);
    }
  };

  addUser = (user, group) => {
    group.linkUser(user);
  };

  empty() {
    this.groups = [];
  }

  get unreadLength() {
    return this.groups.reduce(
      (total, group) => (total += group.unreadLength),
      0
    );
  }
}
decorate(GroupStore, {
  groups: observable,
  empty: action,
  addGroup: action,
  addUser: action,
  unreadLength: computed
});
export default GroupStore;
