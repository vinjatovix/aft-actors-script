import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSelector } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(() => ({
    pathname: "/protected",
    search: "?query=123",
  })),
}));

describe("PrivateRoute Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders children when token exists", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: "valid-token",
    });

    const { getByText } = render(
      <MemoryRouter
        initialEntries={["/protected"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to /login when token does not exist", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ token: null });

    const { container } = render(
      <MemoryRouter
        initialEntries={["/protected"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.textContent).toBe("Login Page");
  });

  it("saves the last path to localStorage", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: "valid-token",
    });

    render(
      <MemoryRouter
        initialEntries={["/protected?query=123"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(localStorage.getItem("lastPath")).toBe("/protected?query=123");
  });
});
