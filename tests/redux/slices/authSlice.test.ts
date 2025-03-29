import authReducer, {
  loginUser,
  refreshAuthToken,
  logout,
  clearError,
  registerUser,
} from "../../../src/redux/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("authSlice", () => {
  const initialState = {
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

    global.fetch = jest.fn((url) => {
      let responseBody = null;

      if (url.includes("/api/v1/Auth/register")) {
        responseBody = {};
      }

      if (url.includes("/api/v1/Auth/login")) {
        responseBody = {
          token: "test-token",
          user: {
            username: "test",
            id: "1",
            roles: ["user"],
            email: "test@test.com",
          },
        };
      }

      if (url.includes("/api/v1/Auth/refresh")) {
        responseBody = {
          token: "test-token",
          user: {
            username: "test",
            id: "1",
            roles: ["user"],
            email: "test@test.com",
          },
        };
      }

      if (responseBody !== null) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(responseBody),
          headers: new Headers({
            "Content-Type": "application/json",
            "Content-Length": JSON.stringify(responseBody).length.toString(),
          }),
        });
      }

      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Error desconocido" }),
        headers: new Headers({
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify({
            message: "Error desconocido",
          }).length.toString(),
        }),
      });
    }) as jest.Mock;
  });

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle logout", () => {
    const state = {
      token: "test-token",
      user: {
        username: "test",
        id: "1",
        roles: ["user"],
        email: "test@test.com",
      },
      loading: false,
      error: null,
    };

    const newState = authReducer(state, logout());
    expect(newState).toEqual(initialState);
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("should handle clearError", () => {
    const state = { ...initialState, error: "Some error" };
    const newState = authReducer(state, clearError());
    expect(newState.error).toBeNull();
  });

  it("should handle loginUser async thunk", async () => {
    const store = configureStore({ reducer: authReducer });

    await store.dispatch(
      loginUser({ email: "test@test.com", password: "password" }),
    );

    const state = store.getState();
    expect(state.token).toBe("test-token");
    expect(localStorage.getItem("token")).toBe("test-token");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/Auth\/login/),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "test@test.com", password: "password" }),
      }),
    );
  });

  it("should handle refreshAuthToken async thunk", async () => {
    localStorage.setItem("token", "old-token");

    const store = configureStore({ reducer: authReducer });

    await store.dispatch(refreshAuthToken());

    const state = store.getState();
    expect(state.token).toBe("test-token");
    expect(localStorage.getItem("token")).toBe("test-token");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/Auth\/refresh/),
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("should handle loginUser.rejected", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Login failed" }),
      }),
    ) as jest.Mock;

    const store = configureStore({ reducer: authReducer });

    await store.dispatch(
      loginUser({
        email: "wrong@test.com",
        password: "wrongpass",
      }),
    );

    const state = store.getState();
    expect(state.token).toBeNull();
    expect(state.error).toBe("Login failed");
  });

  it("should handle registerUser async thunk", async () => {
    const store = configureStore({ reducer: authReducer });

    await store.dispatch(
      registerUser({
        id: "1",
        username: "test",
        email: "test@test.com",
        password: "password",
        repeatPassword: "password",
      }),
    );

    const state = store.getState();
    expect(state.token).toBe("test-token");
    expect(state.user.email).toBe("test@test.com");
    expect(localStorage.getItem("token")).toBe("test-token");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/Auth\/register/),
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/Auth\/login/),
      expect.objectContaining({
        method: "POST",
      }),
    );
  });
});
