import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../../../src/actorsScript/components/Loader";

describe("Loader Component", () => {
    it("renders the loader container", () => {
        render(<Loader />);
        const loaderContainer = screen.getByTestId("loader");
        expect(loaderContainer).toBeInTheDocument();
    });

    it("has the correct class applied to the loader", () => {
        render(<Loader />);
        const loaderContainer = screen.getByTestId("loader");
        expect(loaderContainer).toHaveClass("loader");
    });
});