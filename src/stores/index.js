import UiStore from "./UiStore";
import UserStore from "./UserStore";
import GroupStore from "./GroupStore";

import * as firebase from "firebase/app";

class RootStore {
  constructor() {
    var firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId
    };
    // Initialize Firebase
    this.firebase = firebase.initializeApp(firebaseConfig);

    this.userStore = new UserStore(this);
    this.groupStore = new GroupStore(this);
    this.uiStore = new UiStore(this);
  }
}

const getCurrentTimeStamp = () => {
  return firebase.firestore.Timestamp.now();
};

export { getCurrentTimeStamp };

export default RootStore;
