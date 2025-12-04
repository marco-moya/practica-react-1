import { createSlice } from "@reduxjs/toolkit";
import { fetchSongs } from "./thunk";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    results: [],
    loading: false,
    error: null
  },
  reducers: {
    resetResults: () => {}
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.error = null;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = "No se pudieron cargar las canciones";
      })
  }
});

export const { resetResults } = searchSlice.actions
export default searchSlice.reducer;