import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/redux/slices/authSlice';
import characterBuildingReducer from '../../src/redux/slices/characterBuildingSlice';
import langReducer from '../../src/redux/slices/langSlice';

export const mockStore = (
  preloadedState = {}
): ReturnType<typeof configureStore> =>
  configureStore({
    reducer: {
      auth: authReducer,
      characterBuilding: characterBuildingReducer,
      language: langReducer
    },
    preloadedState
  });
