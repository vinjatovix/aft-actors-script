import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { getUserFromToken } from "../../utils/getUserFromToken";
import { API_URL } from "../../constants";

interface User {
  username: string | null;
  id: string | null;
  roles: string[];
  email: string | null;
}

interface AuthState {
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

const handleFetch = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error de autenticación");
  }
  return response.json();
};

const saveToken = (token: string) => localStorage.setItem("token", token);
const clearToken = () => localStorage.removeItem("token");

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await handleFetch(`${API_URL}/api/v1/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      saveToken(data.token);
      return { token: data.token, user: getUserFromToken(data.token) };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Ocurrió un error desconocido",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    credentials: {
      id: string;
      username: string;
      email: string;
      password: string;
      repeatPassword: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await handleFetch(`${API_URL}/api/v1/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return loginUser({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Ocurrió un error desconocido",
      );
    }
  },
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No hay token");

    try {
      const data = await handleFetch(`${API_URL}/api/v1/Auth/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      saveToken(data.token);
      return { token: data.token, user: getUserFromToken(data.token) };
    } catch {
      clearToken();
      return rejectWithValue("Error al refrescar el token");
    }
  },
);

export const autoClearError = () => (dispatch: Dispatch) => {
  setTimeout(() => dispatch(clearError()), 4000);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      clearToken();
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
