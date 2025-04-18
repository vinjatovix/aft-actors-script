import { API_MAP } from "../../../src/constants";
import {
  getAllCharacters,
  getCharactersByBookId,
} from "../../../src/redux/thunks/characterThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

describe("characterThunks", () => {
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

  describe("getAllCharacters thunk", () => {
    it("dispatches fulfilled action with character data", async () => {
      const mockData = [
        {
          id: "1",
          name: "Character 1",
          book: {
            id: "1",
            title: "Book 1",
            author: { id: "1", name: "Author 1" },
          },
        },
      ];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getAllCharacters();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characters/getAll/fulfilled");
      expect(result.payload).toEqual(mockData);
      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.characters.getAll.url}?include=book.author&fields=${encodeURIComponent("name,book.title,book.author.name")}`,
        {
          method: API_MAP.characters.getAll.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          },
        },
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });

    it("dispatches rejected action if token is missing", async () => {
      const thunk = getAllCharacters();

      const result = await thunk(
        mockDispatch,
        () => ({ auth: { token: null } }),
        undefined,
      );

      expect(result.type).toBe("characters/getAll/rejected");
      expect(result.payload).toBe("No hay token disponible");
    });

    it("dispatches rejected action if fetch fails", async () => {
      const errorMessage = "Fetch error";
      mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
      const thunk = getAllCharacters();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characters/getAll/rejected");
      expect(result.payload).toBe(errorMessage);
    });
  });

  describe("getCharactersByBookId thunk", () => {
    it("dispatches fulfilled action with character data", async () => {
      const bookId = "bookId";
      const mockData = [
        {
          id: "1",
          name: "Character 1",
        },
      ];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getCharactersByBookId(bookId);
      const filterParam = encodeURIComponent(`book:${bookId}`);
      const fieldsParam = encodeURIComponent("name");

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characters/getByBookId/fulfilled");
      expect(result.payload).toEqual(mockData);
      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.characters.getAll.url}?filter=${filterParam}&fields=${fieldsParam}`,
        {
          method: API_MAP.characters.getAll.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          },
        },
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });
  });

  it("dispatches rejected action if token is missing", async () => {
    const bookId = "bookId";
    const thunk = getCharactersByBookId(bookId);

    const result = await thunk(
      mockDispatch,
      () => ({ auth: { token: null } }),
      undefined,
    );

    expect(result.type).toBe("characters/getByBookId/rejected");
    expect(result.payload).toBe("No hay token disponible");
  });

  it("dispatches rejected action if fetch fails", async () => {
    const errorMessage = "Fetch error";
    mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
    const thunk = getCharactersByBookId("bookId");

    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(result.type).toBe("characters/getByBookId/rejected");
    expect(result.payload).toBe(errorMessage);
  });
});
