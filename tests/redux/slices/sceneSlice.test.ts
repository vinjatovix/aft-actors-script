import { SceneState } from "../../../src/redux/interfaces/sceneInterfaces";
import sceneReducer from "../../../src/redux/slices/sceneSlice";
import { API_MAP } from "../../../src/constants";
import { scenes } from "../../data";
import {
  getAllScenes,
  getScenesByCharacterId,
} from "../../../src/redux/thunks/sceneThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

const characterId = "123";

describe("sceneSlice", () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();
  const INITIAL_STATE: SceneState = {
    scenes: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedHandleFetch.mockImplementation(() => Promise.resolve(scenes));
    mockDispatch.mockImplementation(async (action) => {
      if (action.type === "scenes/getAll/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.scenes.getAll.url}?include=characters.book.author&fields=description,characters.name,characters.book.title,characters.book.author.name`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "scenes/getAll/fulfilled",
          payload: result,
        });
      }
      if (action.type === "scenes/getByCharacterId/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.scenes.getAll.url}?filter=characters:${characterId}&fields=description,characters.name&include=characters`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "scenes/getByCharacterId/fulfilled",
          payload: result,
        });
      }
    });
  });

  it("should return the initial state", () => {
    const newState = sceneReducer(undefined, { type: "" });

    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should handle getAllScenes pending", () => {
    const newState = sceneReducer(INITIAL_STATE, {
      type: "scenes/getAll/pending",
    });

    expect(newState).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });
  });

  it("should handle getAllScenes fulfilled", () => {
    const newState = sceneReducer(INITIAL_STATE, {
      type: getAllScenes.fulfilled.type,
      payload: scenes,
    });

    expect(newState).toEqual({
      ...INITIAL_STATE,
      scenes,
    });
  });

  it("should handle getAllScenes rejected", () => {
    const newState = sceneReducer(INITIAL_STATE, {
      type: getAllScenes.rejected.type,
      payload: "Error",
    });

    expect(newState).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should handle getScenesByCharacterId pending", () => {
    const newState = sceneReducer(INITIAL_STATE, {
      type: getScenesByCharacterId.pending.type,
    });

    expect(newState).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });
  });

  it("should handle getScenesByCharacterId fulfilled", () => {
    const newState = sceneReducer(INITIAL_STATE, {
      type: getScenesByCharacterId.fulfilled.type,
      payload: scenes,
    });

    expect(newState).toEqual({
      ...INITIAL_STATE,
      scenes,
    });
  });

  it("should handle getScenesByCharacterId rejected", () => {
    const newState = sceneReducer(INITIAL_STATE, {
      type: getScenesByCharacterId.rejected.type,
      payload: "Error",
    });

    expect(newState).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should handle null payload in getAllScenes", () => {
    const action = {
      type: getAllScenes.fulfilled.type,
      payload: null,
    };

    const state = sceneReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(false);
    expect(state.scenes).toEqual([]);
  });

  it("should handle null payload in getScenesByCharacterId", () => {
    const action = {
      type: getScenesByCharacterId.fulfilled.type,
      payload: null,
    };

    const state = sceneReducer(INITIAL_STATE, action);

    expect(state.loading).toBe(false);
    expect(state.scenes).toEqual([]);
  });
});
