import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromToken } from '../../utils/getUserFromToken';
import {
  loginUser,
  refreshAuthToken,
  registerUser,
  updatePassword
} from '../thunks/authThunks';
import { AuthState, User } from '../interfaces/authInterfaces';

const defaultUser: User = {
  username: null,
  id: null,
  roles: [],
  email: null
};

const loadInitialAuthState = (): { token: string | null; user: User } => {
  const token = localStorage.getItem('token');
  return token
    ? { token, user: getUserFromToken(token) || defaultUser }
    : { token: null, user: defaultUser };
};

const initialState: AuthState = {
  ...loadInitialAuthState(),
  loading: false,
  error: null
};

export const autoClearError = () => (dispatch: Dispatch) => {
  setTimeout(() => dispatch(clearError()), 4000);
};

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: AuthState, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error = action.payload as string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = defaultUser;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || defaultUser;
      })
      .addCase(loginUser.rejected, (state, action) => {
        handleRejected(state, action);
        state.token = null;
        state.user = defaultUser;
      })
      .addCase(refreshAuthToken.pending, handlePending)
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || defaultUser;
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        handleRejected(state, action);
        state.token = null;
        state.user = defaultUser;
      })
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(updatePassword.pending, handlePending)
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, handleRejected);
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
