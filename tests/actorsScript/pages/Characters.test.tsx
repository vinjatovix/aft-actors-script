import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Characters } from "../../../src/actorsScript/pages/Characters";
import { store } from "../../../src/redux/store";
import { Provider } from "react-redux";

describe("Characters Page", () => {
  it("renders the Characters page with a title and author names", () => {
    render(
      <Provider store={store}>
        render(<Characters />);
      </Provider>
    )

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Characters"
    );
  });

  it("renders the icon image", () => {
    render(
      <Provider store={store}>
        render(<Characters />);
      </Provider>
    )
    const icon = screen.getByAltText("Icono dun persoaxe con máscara de hockey");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/assets/character.svg");
  });
});
