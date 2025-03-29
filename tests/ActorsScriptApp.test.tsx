import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getEnv } from "../src/helpers/getEnv";
import { ActorsScriptApp } from "../src/ActorsScriptApp";

jest.mock("../src/helpers/getEnv", () => ({
    getEnv: jest.fn(),
}));

jest.mock("../src/router/AppRouter", () => ({
    AppRouter: () => <div data-testid="app-router">App Router</div>,
}));

describe("ActorsScriptApp", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    afterEach(() => {
        jest.resetModules();
    });

    it("debería renderizar AppRouter correctamente", () => {
        (getEnv as jest.Mock).mockReturnValue({ ENVIRONMENT: "production" });

        render(<ActorsScriptApp />);

        expect(screen.getByTestId("app-router")).toBeInTheDocument();
    });

    it("debería mostrar la franja de desarrollo cuando ENVIRONMENT no es 'production'", () => {
        (getEnv as jest.Mock).mockReturnValue({ ENVIRONMENT: "development" });
        
        render(<ActorsScriptApp />);

        expect(screen.getByText(/ENVIRONMENT: DEVELOPMENT/i)).toBeInTheDocument();
    });

    it("no debería mostrar la franja de desarrollo cuando ENVIRONMENT es 'production'", () => {
        (getEnv as jest.Mock).mockReturnValue({ ENVIRONMENT: "production" });

        render(<ActorsScriptApp />);

        expect(screen.queryByText(/ENVIRONMENT:/i)).not.toBeInTheDocument();
    });
});
