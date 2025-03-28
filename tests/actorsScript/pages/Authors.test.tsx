import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Authors } from "../../../src/actorsScript/pages/Authors";

describe("Authors Page", () => {
  it("renders the Authors page with a title and author names", () => {
    render(<Authors />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Authors"
    );
  });

  it("renders the icon image", () => {
    render(<Authors />);
    const icon = screen.getByAltText("Icono dun autor");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/src/assets/author.svg");
  });
});
