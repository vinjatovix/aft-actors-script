import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { mockStore } from "../../__mocks__/mockStore";

import { CharacterBuildingsPage } from "../../../src/actorsScript/pages/CharacterBuildingsPage";
import { users } from "../../data";
import { handleFetch } from "../../../src/utils/handleFetch";
import * as characterBuildingThunks from "../../../src/redux/thunks/characterBuildingThunks";

jest.mock("../../../src/utils/handleFetch", () => ({
  handleFetch: jest.fn(),
}));

describe("CharacterBuildingsPage", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: { token: "mockToken", user: users[0] },
      characterBuilding: {
        characterBuildings: [],
        loading: false,
        error: null,
        selectedCharacterBuilding: null,
      },
    });
  });

  it("dispatches getAllCharacterBuildings when token is available", async () => {
    const mockGetAllCharacterBuildings = jest.spyOn(
      characterBuildingThunks,
      "getAllCharacterBuildings"
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <CharacterBuildingsPage />
        </Provider>
      );
    });

    expect(mockGetAllCharacterBuildings).toHaveBeenCalled();
  });

  it("renders loading state when loading is true", () => {
    render(
      <Provider store={store}>
        <CharacterBuildingsPage />
      </Provider>
    );

    expect(screen.getByText("Cargando construcciones...")).toBeInTheDocument();
  });

  it("renders error message when there is an error", async () => {
    (handleFetch as jest.Mock).mockImplementation(() => {
      throw new Error("Error al cargar construcciones");
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <CharacterBuildingsPage />
        </Provider>
      );
    });

    expect(
      await screen.findByText(/Error al cargar construcciones/i)
    ).toBeInTheDocument();
  });

  it("renders 'No hay construcciones disponibles' when there are no character buildings", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <CharacterBuildingsPage />
        </Provider>
      );
    });

    expect(
      await screen.findByText("No hay construcciones disponibles")
    ).toBeInTheDocument();
  });
});
