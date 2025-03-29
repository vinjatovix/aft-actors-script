import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/slices/authSlice";
import Login from "../../src/auth/pages/Login";

const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });

const renderWithProvider = (store: ReturnType<typeof mockStore>) =>
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

const fillLoginForm = (email: string, password: string) => {
  fireEvent.change(screen.getByPlaceholderText("Correo"), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText("Contrasinal"), {
    target: { value: password },
  });
};

describe("Login Page", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    store = mockStore();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "BackEndError" }),
      })
    ) as unknown as jest.MockedFunction<typeof fetch>;
  });

  it("should render the login form", () => {
    renderWithProvider(store);

    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contrasinal")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should dispatch login action when form is submitted", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    renderWithProvider(store);
    fillLoginForm("test@example.com", "password123");

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should render the backend error message", async () => {
    renderWithProvider(store);
    fillLoginForm("a@a.com", "123456");

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.queryByText("BackEndError")).toBeInTheDocument();
  });
});
