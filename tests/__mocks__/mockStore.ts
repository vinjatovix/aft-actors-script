import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/slices/authSlice";
import characterBuildingReducer from "../../src/redux/slices/characterBuildingSlice";

export const mockStore = (
  preloadedState = {},
): ReturnType<typeof configureStore> =>
  configureStore({
    reducer: { auth: authReducer, characterBuilding: characterBuildingReducer },
    preloadedState,
  });
