import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Characters } from "../../../src/actorsScript/pages/Characters";

describe("Characters Page", () => {
  it("renders the Characters page with a title and author names", () => {
    render(<Characters />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Characters"
    );
  });

  it("renders the icon image", () => {
    render(<Characters />);
    const icon = screen.getByAltText("Icono");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/src/assets/character.svg");
  });
});
