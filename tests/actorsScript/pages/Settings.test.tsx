import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Settings } from "../../../src/actorsScript/pages/Settings";

describe("Settings Page", () => {
  it("renders the Settings page ", () => {
    render(<Settings />);

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Axustes"
    );
  });
});
