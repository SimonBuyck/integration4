import UserStore from "./UserStore";
import User from "../models/User";
import RootStore from ".";

test("Create a new UserStore", () => {
  const store = new RootStore();
  const userstore = new UserStore(store);
  expect(userstore.users).toBeInstanceOf(Array);
  expect(userstore.users.length).toBe(0);
});

test("Search for a user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  expect(store.userStore.searchUser("niks").length).toBe(0);
  expect(store.userStore.searchUser("tus").length).toBe(1);
  expect(store.userStore.searchUser("tus")[0]).toBe(user);
});

test("Resolve a user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const id = user.id;
  expect(store.userStore.resolveUser(id)).toBe(user);
});

test("updateUserFromServer returns a new user when json is passed in", () => {
  const store = new RootStore();
  const user = store.userStore.updateUserFromServer({ name: "testuser" });
  expect(user).toBeInstanceOf(User);
  expect(user.name).toBe("testuser");
});

test("updateUserFromServer updates an existing user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const updateUser = store.userStore.updateUserFromServer({
    id: user.id,
    name: "testuserupdated",
  });
  expect(updateUser.id).toBe(user.id);
  expect(updateUser.name).toBe("testuserupdated");
  expect(updateUser).toBe(user);
});
