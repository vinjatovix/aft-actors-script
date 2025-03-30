import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import characterReducer from "./slices/characterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
