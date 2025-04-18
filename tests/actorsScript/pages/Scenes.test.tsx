import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Scenes } from "../../../src/actorsScript/pages/Scenes";
import { Provider } from "react-redux";
import { store } from "../../../src/redux/store";

describe("Scenes Page", () => {
  it("renders the Scenes page with a title and author names", () => {
    render(
      <Provider store={store}>
        render(<Scenes />);
      </Provider>
    )

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Esceas"
    );
  });
});
