import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/slices/authSlice";
import { Register } from "../../src/auth/pages/Register";

const mockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
};

const renderWithProvider = (store: ReturnType<typeof mockStore>) => {
  return render(
    <Provider store={store}>
      <Register />
    </Provider>
  );
};

const fillRegisterForm = (
  username: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  fireEvent.change(screen.getByPlaceholderText("Nome"), {
    target: { value: username },
  });
  fireEvent.change(screen.getByPlaceholderText("Correo"), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText("Contrasinal"), {
    target: { value: password },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirma contrasinal"), {
    target: { value: repeatPassword },
  });
}

describe("Register Page", () => {
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the registration form", () => {
    const placeholders = [
      "Nome",
      "Correo",
      "Contrasinal",
      "Confirma contrasinal",
    ];

    renderWithProvider(store);

    placeholders.forEach((placeholder) => {
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
    expect(screen.getByRole("button")).toHaveTextContent("Rexístrate");
  });

  it("should display validation errors when form is submitted with invalid data", async () => {
    const errorMessages = ["É obrigatorio."];

    renderWithProvider(store);
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    errorMessages.forEach((message) => {
      expect(screen.getAllByText(message)).toHaveLength(3);
    });
  });

  it("should dispatch register action when form is submitted with valid data", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    renderWithProvider(store);
    fillRegisterForm(
      "TestUser",
      "test@example.com",
      "Password.123",
      "Password.123"
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should display error message when email is invalid", async () => {
    renderWithProvider(store);
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "test@test" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("O correo non é válido.")).toBeInTheDocument();
  });

  it("should display error message when passwords do not match", async () => {
    renderWithProvider(store);
    fillRegisterForm(
      "Test User",
      "test@da.com",
      "Password@123",
      "Password@456"
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(
      screen.getByText("Os contrasinais non coinciden.")
    ).toBeInTheDocument();
  });

  it("should display error message when password is invalid", async () => {
    renderWithProvider(store);
    fireEvent.change(screen.getByPlaceholderText("Contrasinal"), {
      target: { value: "password" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(
      screen.getByText(
        "O contrasinal é feble.")
    ).toBeInTheDocument();
  });

  it("should display error message when username is invalid", async () => {
    renderWithProvider(store);
    fillRegisterForm(
      "Test User",
      "dsa@dsa.com",
      "Password.123",
      "Password.123"
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(
      screen.getByText("O nome de usuario non é válido.")
    ).toBeInTheDocument();
  });

  //Injection test
  test.each(["<script>alert('XSS')</script>", "<img src=x onerror=alert(1)>", "%0D%0A"])(
    "should display error message when input contains injection characters: %p", async (inj) => {
      renderWithProvider(store);
      fillRegisterForm(
        "testUser",
        "das@das.com",
        inj,
        "Password.123"
      );

      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(
        screen.getByText("Amodo oh! -9001")
      ).toBeInTheDocument();
    });


  it("should render the backend error message", async () => {
    renderWithProvider(store);
    fillRegisterForm(
      "TestUser",
      "te@dsa.com",
      "Password.123",
      "Password.123"
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.queryByText("BackEndError")).toBeInTheDocument();
  });
});
