import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getUserFromToken } from "../../utils/getUserFromToken";
import {
  loginUser,
  refreshAuthToken,
  registerUser,
} from "../thunks/authThunks";

export interface User {
  username: string | null;
  id: string | null;
  roles: string[];
  email: string | null;
}
export interface LoginPayload extends Record<string, string> {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  user: User;
}
export interface RegisterPayload {
  id: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface AuthState {
  token: string | null;
  user: User;
  loading: boolean;
  error: string | null;
}

const defaultUser: User = {
  username: null,
  id: null,
  roles: [],
  email: null,
};

const loadInitialAuthState = (): { token: string | null; user: User } => {
  const token = localStorage.getItem("token");
  return token
    ? { token, user: getUserFromToken(token) || defaultUser }
    : { token: null, user: defaultUser };
};

const initialState: AuthState = {
  ...loadInitialAuthState(),
  loading: false,
  error: null,
};

export const autoClearError = () => (dispatch: Dispatch) => {
  setTimeout(() => dispatch(clearError()), 4000);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = defaultUser;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || defaultUser;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = defaultUser;
        state.error = action.payload as string;
      })
      .addCase(refreshAuthToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || defaultUser;
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = defaultUser;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
