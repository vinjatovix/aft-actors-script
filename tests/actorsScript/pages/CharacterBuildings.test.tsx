import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterBuildings } from "../../../src/actorsScript/pages/CharacterBuildingsPage";
import { Provider } from "react-redux";
import { store } from "../../../src/redux/store";

describe("CharacterBuildings Page", () => {
  it("renders the CharacterBuildings page with a title and author names", () => {
    render(
      <Provider store={store}>
        render(<CharacterBuildings />);
      </Provider>
    )

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Construccións de persoaxe"
    );
  });
});
