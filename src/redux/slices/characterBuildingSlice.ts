import { createSlice } from "@reduxjs/toolkit";
import { CharacterBuildingState } from "../interfaces/characterBuildingInterfaces";
import {
  createCharacterBuilding,
  deleteCharacterBuilding,
  getAllCharacterBuildings,
} from "../thunks/characterBuildingThunks";

const initialState: CharacterBuildingState = {
  characterBuildings: [],
  selectedCharacterBuilding: null,
  loading: false,
  error: null,
};

const characterBuildingSlice = createSlice({
  name: "characterBuilding",
  initialState,
  reducers: {
    setSelectedCharacterBuilding: (state, action) => {
      state.selectedCharacterBuilding = action.payload;
    },
    clearSelectedCharacterBuilding: (state) => {
      state.selectedCharacterBuilding = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacterBuildings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCharacterBuildings.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload", action.payload);
        console.log("state.characterBuildings", state.characterBuildings);
        state.characterBuildings = action.payload ?? []; // Verifica que action.payload tenga los datos correctos
      })
      .addCase(getAllCharacterBuildings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCharacterBuilding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCharacterBuilding.fulfilled, (state, action) => {
        state.loading = false;
        state.characterBuildings.push(action.payload);
        state.error = null;
      })
      .addCase(createCharacterBuilding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCharacterBuilding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCharacterBuilding.fulfilled, (state, action) => {
        state.loading = false;
        state.characterBuildings = state.characterBuildings.filter(
          (building) => building.id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteCharacterBuilding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCharacterBuilding, clearSelectedCharacterBuilding } =
  characterBuildingSlice.actions;

export default characterBuildingSlice.reducer;
