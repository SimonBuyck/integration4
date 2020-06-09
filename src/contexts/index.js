import { createContext } from "react";
import RootStore from "../stores";
import User from "../models/User";
import Match from "../models/Match";

const store = new RootStore();

const u1 = new User({
  id: "1",
  name: "Simon",
  country: "Belgium",
  video: "../../assets/video/video1.mp4",
  dance: "polka",
  password: "test123",
  store: store.userStore,
});

const u2 = new User({
  id: "2",
  name: "Jorne",
  country: "Belgium",
  video: "../../assets/video/video1.mp4",
  dance: "polka",
  password: "test123",
  partnerId: '3',
  store: store.userStore,
});

new User({
  id: "3",
  name: "Jorne",
  country: "Belgium",
  video: "../../assets/video/video2.mp4",
  dance: "polka",
  password: "test123",
  partnerId: "2",
  store: store.userStore,
});

new Match({date: new Date(), accepted: false, users: {u1, u2}, store: store.matchStore})

store.uiStore.setCurrentUser(u1);

window.store = store;

export const storeContext = createContext(store);
