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
  video: "../../assets/video/video2.mp4",
  dance: "polka",
  password: "test123",
  store: store.userStore,
});

const u3 = new User({
  id: "3",
  name: "Pieter-Jan",
  country: "Belgium",
  video: "../../assets/video/video1.mp4",
  dance: "Sweed",
  password: "test123",
  partner: u2,
  store: store.userStore,
});

u2.partner = u3;

new User({
  id: "4",
  name: "Pieter",
  country: "Belgium",
  video: "../../assets/video/video2.mp4",
  dance: "Monaco",
  password: "test123",
  store: store.userStore,
});

new Match({
  accepted: false,
  users: [u1 , u2 ],
  store: store.matchStore,
});

store.uiStore.setCurrentUser(u1);

window.store = store;

export const storeContext = createContext(store);
