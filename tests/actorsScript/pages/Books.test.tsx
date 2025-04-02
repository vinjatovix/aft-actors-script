import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Books } from "../../../src/actorsScript/pages/Books";
import { Provider } from "react-redux";
import { store } from "../../../src/redux/store";

describe("Books Page", () => {
  it("renders the Books page with a title", () => {
    render(
      <Provider store={store}>
        <Books />
      </Provider>
    );
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Obras"
    );
  });
});
