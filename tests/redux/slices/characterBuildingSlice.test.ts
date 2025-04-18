import { CharacterBuildingState } from "../../../src/redux/interfaces/characterBuildingInterfaces";
import characterBuildingReducer from "../../../src/redux/slices/characterBuildingSlice";
import { API_MAP } from "../../../src/constants";
import { characterBuildings } from "../../data";
import {
  getAllCharacterBuildings,
  createCharacterBuilding,
  deleteCharacterBuilding,
} from "../../../src/redux/thunks/characterBuildingThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

describe("characterBuildingSlice", () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();
  const INITIAL_STATE: CharacterBuildingState = {
    characterBuildings: [],
    selectedCharacterBuilding: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedHandleFetch.mockImplementation(() =>
      Promise.resolve(characterBuildings),
    );
    mockDispatch.mockImplementation(async (action) => {
      if (action.type === "characterBuilding/getAll/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.characterBuildings.getAll.url}?include=characters.book.author&fields=description,characters.name,characters.book.title,characters.book.author.name`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "characterBuilding/getAll/fulfilled",
          payload: result,
        });
      }
      if (action.type === "characterBuilding/create/pending") {
        const result = await mockedHandleFetch(
          API_MAP.characterBuildings.create.url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(action.payload),
          },
        );
        mockDispatch({
          type: "characterBuilding/create/fulfilled",
          payload: result,
        });
      }
      if (action.type === "characterBuilding/delete/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.characterBuildings.delete.url}/${action.payload}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "characterBuilding/delete/fulfilled",
          payload: result,
        });
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return the initial state", () => {
    const state = characterBuildingReducer(undefined, { type: "" });

    expect(state).toEqual(INITIAL_STATE);
  });

  it("should handle getAllCharacterBuildings.pending", () => {
    const action = { type: getAllCharacterBuildings.pending.type };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null,
    });
  });

  it("should handle getAllCharacterBuildings.fulfilled", () => {
    const action = {
      type: getAllCharacterBuildings.fulfilled.type,
      payload: characterBuildings,
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      characterBuildings: action.payload,
      loading: false,
      error: null,
    });
  });

  it("should handle getAllCharacterBuildings.rejected", () => {
    const action = {
      type: getAllCharacterBuildings.rejected.type,
      payload: "Error",
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should handle createCharacterBuilding.pending", () => {
    const action = { type: createCharacterBuilding.pending.type };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null,
    });
  });

  it("should handle createCharacterBuilding.fulfilled", () => {
    const action = {
      type: createCharacterBuilding.fulfilled.type,
      payload: characterBuildings,
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      characterBuildings: [action.payload],
      loading: false,
      error: null,
    });
  });

  it("should handle createCharacterBuilding.rejected", () => {
    const action = {
      type: createCharacterBuilding.rejected.type,
      payload: "Error",
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should handle deleteCharacterBuilding.pending", () => {
    const action = { type: deleteCharacterBuilding.pending.type };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null,
    });
  });

  it("should handle deleteCharacterBuilding.fulfilled", () => {
    const action = {
      type: deleteCharacterBuilding.fulfilled.type,
      payload: characterBuildings[0].id,
    };

    const state = characterBuildingReducer(
      {
        ...INITIAL_STATE,
        characterBuildings: characterBuildings,
      },
      action,
    );

    expect(state).toEqual({
      ...INITIAL_STATE,
      characterBuildings: characterBuildings.filter(
        (building) => building.id !== action.payload,
      ),
      loading: false,
      error: null,
    });
  });

  it("should handle deleteCharacterBuilding.rejected", () => {
    const action = {
      type: deleteCharacterBuilding.rejected.type,
      payload: "Error",
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should handle setSelectedCharacterBuilding", () => {
    const action = {
      type: "characterBuilding/setSelectedCharacterBuilding",
      payload: characterBuildings[0],
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      selectedCharacterBuilding: characterBuildings[0],
    });
  });

  it("should handle clearSelectedCharacterBuilding", () => {
    const action = {
      type: "characterBuilding/clearSelectedCharacterBuilding",
    };

    const state = characterBuildingReducer(
      {
        ...INITIAL_STATE,
        selectedCharacterBuilding: characterBuildings[0],
      },
      action,
    );

    expect(state).toEqual({
      ...INITIAL_STATE,
      selectedCharacterBuilding: null,
    });
  });

  it("should handle null payload in getAllCharacterBuilding", () => {
    const action = {
      type: getAllCharacterBuildings.fulfilled.type,
      payload: null,
    };

    const state = characterBuildingReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      characterBuildings: [],
      loading: false,
      error: null,
    });
  });
});
