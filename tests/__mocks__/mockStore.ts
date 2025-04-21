import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/redux/slices/authSlice';
import characterBuildingReducer from '../../src/redux/slices/characterBuildingSlice';
import bookReducer from '../../src/redux/slices/bookSlice';
import characterReducer from '../../src/redux/slices/characterSlice';
import sceneReducer from '../../src/redux/slices/sceneSlice';
import langReducer from '../../src/redux/slices/langSlice';

export const mockStore = (
  preloadedState = {}
): ReturnType<typeof configureStore> =>
  configureStore({
    reducer: {
      auth: authReducer,
      book: bookReducer,
      character: characterReducer,
      scene: sceneReducer,
      characterBuilding: characterBuildingReducer,
      language: langReducer
    },
    preloadedState
  });
