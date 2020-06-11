import { createContext } from "react";
import RootStore from "../stores";

const store = new RootStore();

window.store = store;

export const storeContext = createContext(store);
