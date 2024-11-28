import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utills/localStorage";

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    tables: tableReducer,
  },
  preloadedState,
});

// Save state to localStorage on every state change
store.subscribe(() => {
  saveStateToLocalStorage(store.getState().tables);
});

export default store;
