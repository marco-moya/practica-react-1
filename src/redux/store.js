import { legacy_createStore as createStore } from "redux";
import libraryReducer from "./libraryReducer";

let persistedLibrary = [];
try {
  const stored = localStorage.getItem("myLibrary");
  if (stored) {
    persistedLibrary = JSON.parse(stored);
  }
} catch (error) {
  console.warn("Error parsing localStorage myLibrary:", error);
  localStorage.removeItem("myLibrary");
}

const initialState = {
  token: null,
  library: persistedLibrary,
};

const store = createStore(libraryReducer, initialState);

export default store;
