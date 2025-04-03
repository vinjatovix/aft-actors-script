import { createSlice } from "@reduxjs/toolkit";
import { SceneState } from "../interfaces/sceneInterfaces";
import { getAllScenes, getScenesByCharacterId } from "../thunks/sceneThunks";

const initialState: SceneState = {
  scenes: [],
  loading: false,
  error: null,
};

const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllScenes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllScenes.fulfilled, (state, action) => {
        state.loading = false;
        state.scenes = action.payload ?? [];
      })
      .addCase(getAllScenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getScenesByCharacterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScenesByCharacterId.fulfilled, (state, action) => {
        state.loading = false;
        state.scenes = action.payload ?? [];
      })
      .addCase(getScenesByCharacterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sceneSlice.reducer;
