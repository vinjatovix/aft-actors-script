import { API_MAP } from "../../../src/constants";
import {
  getAllScenes,
  getScenesByCharacterId,
} from "../../../src/redux/thunks/sceneThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

describe("sceneThunks", () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();

  const mockToken = "mockToken";
  const mockGetState = () => ({
    auth: {
      token: mockToken,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllScenes thunk", () => {
    it("dispatches fulfilled action with scene data", async () => {
      const mockData = [
        {
          id: "1",
          title: "Scene 1",
          description: "Description 1",
        },
      ];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getAllScenes();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("scenes/getAll/fulfilled");
      expect(result.payload).toEqual(mockData);
      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.scenes.getAll.url}?include=characters.book.author&fields=${encodeURIComponent("description,characters.name,characters.book.title,characters.book.author.name")}`,
        {
          method: API_MAP.scenes.getAll.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          },
        },
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });

    it("dispatches rejected action if token is missing", async () => {
      const thunk = getAllScenes();

      const result = await thunk(
        mockDispatch,
        () => ({ auth: { token: null } }),
        undefined,
      );

      expect(result.type).toBe("scenes/getAll/rejected");
    });

    it("dispatches rejected action if handleFetch fails", async () => {
      const errorMessage = "Fetch error";
      mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
      const thunk = getAllScenes();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("scenes/getAll/rejected");
      expect(result.payload).toBe(errorMessage);
    });
  });

  describe("getScenesByCharacterId thunk", () => {
    it("dispatches fulfilled action with scene data", async () => {
      const characterId = "1";
      const mockData = [
        {
          id: "1",
          title: "Scene 1",
          description: "Description 1",
        },
      ];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getScenesByCharacterId(characterId);
      const filter = encodeURIComponent(`characters:${characterId}`);
      const fields = encodeURIComponent("description,characters.name");

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("scenes/getByCharacterId/fulfilled");
      expect(result.payload).toEqual(mockData);
      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.scenes.getAll.url}?filter=${filter}&fields=${fields}&include=characters`,
        {
          method: API_MAP.scenes.getAll.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          },
        },
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });

    it("dispatches rejected action if token is missing", async () => {
      const thunk = getScenesByCharacterId("1");

      const result = await thunk(
        mockDispatch,
        () => ({ auth: { token: null } }),
        undefined,
      );

      expect(result.type).toBe("scenes/getByCharacterId/rejected");
    });

    it("dispatches rejected action if handleFetch fails", async () => {
      const errorMessage = "Fetch error";
      mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
      const thunk = getScenesByCharacterId("1");

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("scenes/getByCharacterId/rejected");
      expect(result.payload).toBe(errorMessage);
    });
  });
});
