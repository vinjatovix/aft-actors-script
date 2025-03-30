import { createSlice } from "@reduxjs/toolkit";
import { CharacterBuildingState } from "../interfaces/characterBuildingInterfaces";
import { getAllCharacterBuildings } from "../thunks/characterBuildingThunks";

const initialState: CharacterBuildingState = {
  characterBuildings: [],
  loading: false,
  error: null,
};

const characterBuildingSlice = createSlice({
  name: "characterBuilding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacterBuildings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCharacterBuildings.fulfilled, (state, action) => {
        state.loading = false;
        state.characterBuildings = action.payload ?? [];
      })
      .addCase(getAllCharacterBuildings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default characterBuildingSlice.reducer;
