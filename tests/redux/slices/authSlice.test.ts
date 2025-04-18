import authReducer, {
  clearError,
  logout,
} from "../../../src/redux/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import {
  loginUser,
  refreshAuthToken,
  registerUser,
} from "../../../src/redux/thunks/authThunks";
import { API_MAP } from "../../../src/constants";
import { handleFetch } from "../../../src/utils/handleFetch";
import {
  AuthLoginResponse,
  AuthState,
} from "../../../src/redux/interfaces/authInterfaces";

jest.mock("../../../src/utils/handleFetch", () => ({
  handleFetch: jest.fn(),
}));

jest.mock("../../../src/utils/getUserFromToken", () => ({
  getUserFromToken: jest.fn(() => ({
    id: "1",
    username: "test",
    email: EMAIL,
    roles: ["user"],
  })),
}));

const EMAIL = "test@email.com";
const PASSWORD = "password";
const TOKEN = "test-token";

const DEFAULT_RESPONSE: AuthLoginResponse = {
  token: TOKEN,
  user: {
    username: "test",
    id: "1",
    roles: ["user"],
    email: EMAIL,
  },
};

describe("authSlice", () => {
  const INITIAL_STATE: AuthState = {
    token: null,
    user: {
      username: null,
      id: null,
      roles: [],
      email: null,
    },
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (handleFetch as jest.Mock).mockImplementation(
      async (url: string): Promise<AuthLoginResponse | null> => {
        if (url.includes(API_MAP.auth.register.url)) return null;
        if (
          url.includes(API_MAP.auth.login.url) ||
          url.includes(API_MAP.auth.refreshToken.url)
        ) {
          return DEFAULT_RESPONSE;
        }
        throw new Error("Error desconocido");
      },
    );
  });

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(INITIAL_STATE);
  });

  it("should handle logout", () => {
    const state = {
      token: TOKEN,
      user: {
        username: "test",
        id: "1",
        roles: ["user"],
        email: EMAIL,
      },
      loading: false,
      error: null,
    };

    const newState = authReducer(state, logout());

    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should handle clearError", () => {
    const state = { ...INITIAL_STATE, error: "Some error" };

    const newState = authReducer(state, clearError());

    expect(newState.error).toBeNull();
  });

  it("should handle loginUser async thunk", async () => {
    const store = configureStore({ reducer: authReducer });

    await store.dispatch(loginUser({ email: EMAIL, password: PASSWORD }));

    const state = store.getState();
    expect(state.token).toBe(TOKEN);
    expect(localStorage.getItem("token")).toBe(TOKEN);
    expect(handleFetch).toHaveBeenCalledWith(
      expect.stringMatching(API_MAP.auth.login.url),
      expect.objectContaining({
        method: API_MAP.auth.login.method,
        body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
      }),
    );
  });

  it("should handle refreshAuthToken async thunk", async () => {
    localStorage.setItem("token", "old-token");
    const store = configureStore({ reducer: authReducer });

    await store.dispatch(refreshAuthToken());

    const state = store.getState();
    expect(state.token).toBe(TOKEN);
    expect(localStorage.getItem("token")).toBe(TOKEN);
    expect(handleFetch).toHaveBeenCalledWith(
      expect.stringMatching(API_MAP.auth.refreshToken.url),
      expect.objectContaining({
        method: API_MAP.auth.refreshToken.method,
      }),
    );
  });

  it("should handle refreshAuthToken.rejected", async () => {
    const errorMessage = "Token refresh failed";
    (handleFetch as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const store = configureStore({ reducer: authReducer });
    localStorage.setItem("token", "old-token");
    await store.dispatch(refreshAuthToken());

    const state = store.getState();

    expect(state.token).toBe(null);
    expect(state.error).toBe(errorMessage);
    expect(localStorage.getItem("token")).toBe(null);
  });

  it("should handle loginUser.rejected", async () => {
    const errorMessage = "Login failed";
    (handleFetch as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const store = configureStore({ reducer: authReducer });

    await store.dispatch(loginUser({ email: EMAIL, password: PASSWORD }));

    const state = store.getState();
    expect(state.token).toBeNull();
    expect(state.error).toBe(errorMessage);
  });

  it("should handle registerUser async thunk", async () => {
    const store = configureStore({ reducer: authReducer });

    await store.dispatch(
      registerUser({
        id: "1",
        username: "test",
        email: EMAIL,
        password: PASSWORD,
        repeatPassword: PASSWORD,
      }),
    );

    const state = store.getState();
    expect(state.token).toBe(TOKEN);
    expect(state.user.email).toBe(EMAIL);
    expect(localStorage.getItem("token")).toBe(TOKEN);
    expect(handleFetch).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(API_MAP.auth.register.url),
      expect.objectContaining({ method: API_MAP.auth.register.method }),
    );
    expect(handleFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(API_MAP.auth.login.url),
      expect.objectContaining({ method: API_MAP.auth.login.method }),
    );
  });
});
