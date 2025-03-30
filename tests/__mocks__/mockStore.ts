import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/slices/authSlice";

export const mockStore = (
  preloadedState = {},
): ReturnType<typeof configureStore> =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
