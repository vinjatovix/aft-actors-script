import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { Register } from "../../src/auth/pages/Register";
import { mockStore } from "../__mocks__/mockStore";

jest.mock("../../src/utils/handleFetch", () => ({
  handleFetch: jest.fn().mockImplementation(() => Promise.reject(new Error("BackEndError"))),
}));

import { BrowserRouter } from "react-router-dom";

const renderWithProvider = (store: ReturnType<typeof mockStore>) => {
  return render(
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </BrowserRouter>
    </Provider>
  );
};

const fillRegisterForm = (
  username: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  fireEvent.change(screen.getByLabelText("Nome"), {
    target: { value: username },
  });
  fireEvent.change(screen.getByLabelText("Correo"), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText("Contrasinal"), {
    target: { value: password },
  });
  fireEvent.change(screen.getByLabelText("Confirma contrasinal"), {
    target: { value: repeatPassword },
  });
}

describe("Register Page", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    store = mockStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the registration form", () => {
    const labels = [
      "Nome",
      "Correo",
      "Contrasinal",
      "Confirma contrasinal",
    ];

    renderWithProvider(store);

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
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
    fireEvent.change(screen.getByPlaceholderText("aaron@swartz.op"), {
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
    fireEvent.change(screen.getByPlaceholderText("********"), {
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
