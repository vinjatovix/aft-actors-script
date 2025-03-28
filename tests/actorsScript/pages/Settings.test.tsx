import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Settings } from "../../../src/actorsScript/pages/Settings";

describe("Settings Page", () => {
  it("renders the Settings page ", () => {
    render(<Settings />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Axustes"
    );
  });

  it("renders the icon image", () => {
    render(<Settings />);
    const icon = screen.getByAltText("Icono dunha roda de engranaxe");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/src/assets/settings.svg");
  });
});
