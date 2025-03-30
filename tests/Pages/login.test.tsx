import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import { Provider } from "react-redux";
import Login from "../../src/auth/pages/Login";
import { mockStore } from "../__mocks__/mockStore";


jest.mock("../../src/utils/handleFetch", () => ({
  handleFetch: jest.fn().mockImplementation(() => Promise.reject(new Error("BackEndError"))),
}));


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

  });
  afterEach(() => {
    jest.restoreAllMocks();
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
    fillLoginForm("test@example.com", "password123Adwr!");

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should render the backend error message", async () => {
    renderWithProvider(store);
    fillLoginForm("a@a.com", "password123Adwr!");

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.queryByText("BackEndError")).toBeInTheDocument();
  });



  it("should display validation errors when form is submitted with invalid data", async () => {
    const errorMessages = ["É obrigatorio."];
    renderWithProvider(store);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    errorMessages.forEach((message) => {
      expect(screen.getAllByText(message)).toHaveLength(2);
    });
  });
});
