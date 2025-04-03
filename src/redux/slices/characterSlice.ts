import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCharacters,
  getCharactersByBookId,
} from "../thunks/characterThunks";
import { CharacterState } from "../interfaces/characterInterfaces";

const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload ?? [];
      })
      .addCase(getAllCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCharactersByBookId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCharactersByBookId.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload ?? [];
      })
      .addCase(getCharactersByBookId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default characterSlice.reducer;
