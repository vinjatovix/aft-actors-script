import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { store } from "../src/redux/store";
import { ActorsScriptApp } from "../src/ActorsScriptApp";
import { getEnv } from "../src/helpers/getEnv";

jest.mock("../src/helpers/getEnv", () => ({
    getEnv: jest.fn().mockReturnValue({
        ENVIRONMENT: "production",
        API_URL: "",
    }),
}));

jest.mock("../src/router/AppRouter", () => ({
    AppRouter: () => <div data-testid="app-router">App Router</div>,
}));

const providerWrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
        {children}
    </Provider>
);

describe("ActorsScriptApp", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (getEnv as jest.Mock).mockReturnValue({
            ENVIRONMENT: "production", API_URL: ""
        });
    });

    afterEach(() => {
        jest.resetModules();
    });

    it("debería renderizar AppRouter correctamente", () => {
        render(
            providerWrapper({ children: <ActorsScriptApp /> })
        );


        expect(screen.getByTestId("app-router")).toBeInTheDocument();
    });

    it("debería mostrar la franja de desarrollo cuando ENVIRONMENT no es 'production'", () => {
        (getEnv as jest.Mock).mockReturnValue({ ENVIRONMENT: "development" });

        render(
            providerWrapper({ children: <ActorsScriptApp /> })
        );

        expect(screen.getByText(/ENVIRONMENT: DEVELOPMENT/)).toBeInTheDocument();
    });

    it("debería mostrar la franja de desarrollo cuando ENVIRONMENT es 'local'", () => {
        (getEnv as jest.Mock).mockReturnValue({ ENVIRONMENT: "local" });

        render(
            providerWrapper({ children: <ActorsScriptApp /> })
        );

        expect(screen.getByText(/ENVIRONMENT: LOCAL/)).toBeInTheDocument();
    });

    it("no debería mostrar la franja de desarrollo cuando ENVIRONMENT es 'production'", () => {
        render(
            providerWrapper({ children: <ActorsScriptApp /> })
        );

        expect(screen.queryByText(/ENVIRONMENT:/i)).not.toBeInTheDocument();
    });
});
