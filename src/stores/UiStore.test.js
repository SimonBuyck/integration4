import RootStore from "./";
import UiStore from "./UiStore";
import User from "../models/User";

test("Create a UiStore", () => {
  const store = new RootStore();
  const uiStore = new UiStore(store);
  expect(uiStore.currentUser).toBeUndefined();
});

test("Set current user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  store.uiStore.setCurrentUser(user);
  expect(store.uiStore.currentUser).toBe(user);
});
