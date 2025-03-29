import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Scenes } from "../../../src/actorsScript/pages/Scenes";

describe("Scenes Page", () => {
  it("renders the Scenes page with a title and author names", () => {
    render(<Scenes />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Scenes"
    );
  });

  it("renders the icon image", () => {
    render(<Scenes />);
    const icon = screen.getByAltText("Icono dun cubo simulando unha caixa escénica");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/assets/scene.svg");
  });
});
