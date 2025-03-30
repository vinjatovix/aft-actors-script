import { createSlice } from "@reduxjs/toolkit";
import { getAllCharacters } from "../thunks/characterThunks";
import { Character } from "../interfaces/characterInterfaces";

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

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
      });
  },
});

export default characterSlice.reducer;
