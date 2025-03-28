import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Books } from "../../../src/actorsScript/pages/Books";

describe("Books Page", () => {
  it("renders the Books page with a title and author names", () => {
    render(<Books />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Books"
    );
  });

  it("renders the icon image", () => {
    render(<Books />);
    const icon = screen.getByAltText("Icono");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/src/assets/script.svg");
  });
});
