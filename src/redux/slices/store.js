import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "./librarySlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    library: libraryReducer,
    search: searchReducer
  }
});

export default store;