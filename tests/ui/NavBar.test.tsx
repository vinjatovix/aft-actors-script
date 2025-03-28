import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import authReducer from "../../src/redux/slices/authSlice";
import { NavBar } from "../../src/ui/NavBar";

const mockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
};

describe("NavBar Component", () => {
  it("should render the home link", () => {
    const store = mockStore({ auth: { user: null, token: null } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Fogar")).toBeInTheDocument();
  });

  it("should render login link when user is not authenticated", () => {
    const store = mockStore({ auth: { user: null, token: null } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Acceder")).toBeInTheDocument();
  });

  it("should render navigation items when user is authenticated", () => {
    const store = mockStore({
      auth: { user: { username: "testuser" }, token: "testtoken" },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("DramaturgX")).toBeInTheDocument();
    expect(screen.getByText("Obras")).toBeInTheDocument();
    expect(screen.getByText("Persoaxes")).toBeInTheDocument();
    expect(screen.getByText("Esceas")).toBeInTheDocument();
    expect(screen.getByText("Construccións")).toBeInTheDocument();
  });

  it("should render logout button when user is authenticated", () => {
    const store = mockStore({
      auth: { user: { username: "testuser" }, token: "testtoken" },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("testuser Sair")).toBeInTheDocument();
  });

  it("should dispatch logout action when logout button is clicked", () => {
    const store = mockStore({
      auth: { user: { username: "testuser" }, token: "testtoken" },
    });
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("testuser Sair"));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "auth/logout" });
  });
});
