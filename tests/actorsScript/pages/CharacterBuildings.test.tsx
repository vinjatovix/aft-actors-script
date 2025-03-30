import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterBuildings } from "../../../src/actorsScript/pages/CharacterBuildings";
import { Provider } from "react-redux";
import { store } from "../../../src/redux/store";

describe("CharacterBuildings Page", () => {
  it("renders the CharacterBuildings page with a title and author names", () => {
    render(
      <Provider store={store}>
        render(<CharacterBuildings />);
      </Provider>
    )

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Character Buildings"
    );
  });

  it("renders the icon image", () => {
    render(
      <Provider store={store}>
        render(<CharacterBuildings />);
      </Provider>
    )

    const icon = screen.getByAltText("Icono dun obreiro e un libro");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/assets/character-building.svg");
  });
});
