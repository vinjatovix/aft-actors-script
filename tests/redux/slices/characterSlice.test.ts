import { CharacterState } from "../../../src/redux/interfaces/characterInterfaces";
import characterReducer from "../../../src/redux/slices/characterSlice";
import { API_MAP } from "../../../src/constants";
import { characters } from "../../data";
import {
  getAllCharacters,
  getCharactersByBookId,
} from "../../../src/redux/thunks/characterThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

const bookId = "123";

describe("characterSlice", () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();
  const INITIAL_STATE: CharacterState = {
    characters: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedHandleFetch.mockImplementation(() => Promise.resolve(characters));
    mockDispatch.mockImplementation(async (action) => {
      if (action.type === "characters/getAll/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.characters.getAll.url}?include=book&fields=name,book.title`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "characters/getAll/fulfilled",
          payload: result,
        });
      }
      if (action.type === "characters/getByBookId/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.characters.getAll.url}?filter=book:${bookId}&fields=name`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "characters/getByBookId/fulfilled",
          payload: result,
        });
      }
    });
  });

  it("should return the initial state", () => {
    expect(characterReducer(undefined, { type: "" })).toEqual(INITIAL_STATE);
  });

  it("should handle getAllCharacters pending", () => {
    const action = { type: getAllCharacters.pending.type };

    const state = characterReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(true);
  });

  it("should handle getAllCharacters fulfilled", () => {
    const action = {
      type: getAllCharacters.fulfilled.type,
      payload: characters,
    };

    const state = characterReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(false);
    expect(state.characters).toEqual(characters);
  });

  it("should handle getAllCharacters rejected", () => {
    const action = { type: getAllCharacters.rejected.type, payload: "Error" };

    const state = characterReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual("Error");
  });

  it("should handle getCharactersByBookId pending", () => {
    const action = { type: getCharactersByBookId.pending.type };

    const state = characterReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(true);
  });

  it("should handle getCharactersByBookId fulfilled", () => {
    const action = {
      type: getCharactersByBookId.fulfilled.type,
      payload: characters,
    };

    const state = characterReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(false);
    expect(state.characters).toEqual(characters);
  });

  it("should handle getCharactersByBookId rejected", () => {
    const action = {
      type: getCharactersByBookId.rejected.type,
      payload: "Error",
    };

    const state = characterReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual("Error");
  });

  it("should handle null payload in getAllCharacters", () => {
    const action = { type: getAllCharacters.fulfilled.type, payload: null };
    const state = characterReducer(INITIAL_STATE, action);
    expect(state.loading).toBe(false);
    expect(state.characters).toEqual([]);
  });

  it("should handle null payload in getCharactersByBookId", () => {
    const action = {
      type: getCharactersByBookId.fulfilled.type,
      payload: null,
    };
    const state = characterReducer(INITIAL_STATE, action);
    expect(state.loading).toBe(false);
    expect(state.characters).toEqual([]);
  });
});
