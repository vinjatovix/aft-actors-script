import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterBuildings } from "../../../src/actorsScript/pages/CharacterBuildings";

describe("CharacterBuildings Page", () => {
  it("renders the CharacterBuildings page with a title and author names", () => {
    render(<CharacterBuildings />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Character Buildings"
    );
  });

  it("renders the icon image", () => {
    render(<CharacterBuildings />);
    const icon = screen.getByAltText("Icono dun obreiro e un libro");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/assets/character-building.svg");
  });
});
