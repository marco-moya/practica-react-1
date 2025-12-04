import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    myLibrary: [],
  },
  reducers: {
    addSong: (state, action) => {
      if (!state.myLibrary.find((song) => song.id === action.payload.id)) {
        return {
          ...state,
          myLibrary: [...state.myLibrary, action.payload],
        };
      }
    },
    removeSong: (state, action) => {
      return {
        ...state,
        myLibrary: state.myLibrary.filter((song) => song.id !== action.payload),
      }
    }
  }
});

export const { addSong, removeSong} = librarySlice.actions;
export default librarySlice.reducer;
