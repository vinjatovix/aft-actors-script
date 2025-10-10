import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import authorReducer from './slices/authorSlice';
import bookReducer from './slices/bookSlice';
import characterReducer from './slices/characterSlice';
import sceneReducer from './slices/sceneSlice';
import characterBuildingReducer from './slices/characterBuildingSlice';
import langReducer from './slices/langSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    author: authorReducer,
    book: bookReducer,
    character: characterReducer,
    scene: sceneReducer,
    characterBuilding: characterBuildingReducer,
    language: langReducer
  }
});
