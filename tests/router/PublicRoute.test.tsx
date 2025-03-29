import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { PublicRoute } from "../../src/router/PublicRoute";

const mockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: (state = {}) => state,
    },
    preloadedState,
  });
};

describe("PublicRoute", () => {
  it("should render children when there is no token", () => {
    const store = mockStore({
      auth: { token: null },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <PublicRoute>
            <div>Public Content</div>
          </PublicRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("Public Content")).toBeInTheDocument();
  });

  it("should navigate to lastPath when there is a token", () => {
    const store = mockStore({
      auth: { token: "mockToken" },
    });

    localStorage.setItem("lastPath", "/dashboard");

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <PublicRoute>
            <div>Public Content</div>
          </PublicRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(container.innerHTML).not.toContain("Public Content");
  });
});
