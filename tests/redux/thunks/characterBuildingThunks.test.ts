import { API_MAP } from "../../../src/constants";
import {
  createCharacterBuilding,
  deleteCharacterBuilding,
  getAllCharacterBuildings,
  updateCharacterBuilding,
} from "../../../src/redux/thunks/characterBuildingThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

describe("characterBuildingThunks", () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();

  const mockToken = "mockToken";
  const mockUser = {
    id: "userId",
    username: "whatever",
    roles: ["admin"],
    email: "a@a.com",
  };

  const mockGetState = () => ({
    auth: {
      token: mockToken,
      user: mockUser,
      loading: false,
      error: null,
    },
    characterBuilding: {
      characterBuildings: [],
      loading: false,
      error: null,
      selectedCharacterBuilding: null,
    },
    book: {
      books: [],
      loading: false,
      error: null,
    },
    scene: {
      scenes: [],
      loading: false,
      error: null,
    },
    character: {
      characters: [],
      loading: false,
      error: null,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCharacterBuilding thunk", () => {
    const mockPayload = {
      id: "charbuild-1",
      character: { id: "char-1", name: "John Doe" },
      book: { id: "book-1", title: "Book Title" },
      scene: {
        id: "scene-1",
        description: "Test scene",
        characters: [{ id: "char-1", name: "John Doe" }],
      },
      author: { id: "author-1", name: "Jane Austen" },
    };

    it("dispatches fulfilled action with correct data", async () => {
      mockedHandleFetch.mockResolvedValueOnce({});
      const thunk = createCharacterBuilding(mockPayload);

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(mockedHandleFetch).toHaveBeenCalledWith(
        API_MAP.characterBuildings.create.url,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
          body: expect.any(String),
        }),
      );

      expect(result.type).toBe("characterBuilding/create/fulfilled");
      expect(result.payload).toStrictEqual({
        id: mockPayload.id,
        scene: mockPayload.scene,
        character: {
          id: mockPayload.character.id,
          name: mockPayload.character.name,
          book: {
            id: mockPayload.book.id,
            title: mockPayload.book.title,
            author: {
              id: mockPayload.author.id,
              name: mockPayload.author.name,
            },
          },
        },
        relationshipCircumstances: [],
        actionUnits: [],
        sceneCircumstances: "",
        previousCircumstances: "",
        startingPoint: "",
        center: "instinctive",
        actor: {
          id: mockUser.id,
          username: mockUser.username,
        },
        metadata: {
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          createdBy: mockUser.id,
          updatedBy: mockUser.id,
        },
      });
    });

    it("dispatches rejected action if token is missing", async () => {
      const badState = () => ({
        auth: { token: null, user: mockUser },
        characterBuilding: {
          characterBuildings: [],
          loading: false,
          error: null,
          selectedCharacterBuilding: null,
        },
      });

      const thunk = createCharacterBuilding(mockPayload);
      const result = await thunk(mockDispatch, badState, undefined);

      expect(result.type).toBe("characterBuilding/create/rejected");
      expect(result.payload).toBe("No hay token disponible");
    });

    it("dispatches rejected action if user is missing", async () => {
      const badState = () => ({
        auth: { token: mockToken, user: {} },
        characterBuilding: {
          characterBuildings: [],
          loading: false,
          error: null,
          selectedCharacterBuilding: null,
        },
      });

      const thunk = createCharacterBuilding(mockPayload);
      const result = await thunk(mockDispatch, badState, undefined);

      expect(result.type).toBe("characterBuilding/create/rejected");
      expect(result.payload).toBe(
        "El usuario no está disponible o no tiene un ID válido.",
      );
    });

    it("dispatches rejected action if fetch fails", async () => {
      mockedHandleFetch.mockRejectedValueOnce(new Error("Fetch error"));

      const thunk = createCharacterBuilding(mockPayload);
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/create/rejected");
      expect(result.payload).toBe("Fetch error");
    });
  });

  describe("getAllCharacterBuildings thunk", () => {
    it("dispatches fulfilled action with character buildings", async () => {
      const mockData = [{ id: "cb-1" }, { id: "cb-2" }];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const include = encodeURIComponent(
        "character.book.author,scene.characters,actor,relationshipCircumstances.character",
      );
      const fields = encodeURIComponent(
        "startingPoint,previousCircumstances,sceneCircumstances,center,relationshipCircumstances.circumstance,relationshipCircumstances.character.name,scene.description,scene.characters.name,actor.username,actionUnits,center,character.name,character.book.title,character.book.author.name",
      );
      const filter = encodeURIComponent(`actor:${mockUser.id}`);

      const thunk = getAllCharacterBuildings();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/getAll/fulfilled");
      expect(result.payload).toEqual(mockData);
      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.characterBuildings.getAll.url}?include=${include}&fields=${fields}&filter=${filter}`,
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        }),
      );
    });

    it("dispatches rejected action if token is missing", async () => {
      const badState = () => ({
        auth: {
          token: null,
          user: {
            id: null,
            username: null,
            roles: [],
            email: null,
          },
          loading: false,
          error: null,
        },
        characterBuilding: {
          characterBuildings: [],
          loading: false,
          error: null,
          selectedCharacterBuilding: null,
        },
        book: {
          books: [],
          loading: false,
          error: null,
        },
        scene: {
          scenes: [],
          loading: false,
          error: null,
        },
        character: {
          characters: [],
          loading: false,
          error: null,
        },
      });

      const thunk = getAllCharacterBuildings();
      const result = await thunk(mockDispatch, badState, undefined);

      expect(result.type).toBe("characterBuilding/getAll/rejected");
      expect(result.payload).toBe("No hay token disponible");
    });

    it("dispatches rejected action if user is missing", async () => {
      const badState = () => ({
        auth: {
          token: mockToken,
          user: {
            id: null,
            username: null,
            roles: [],
            email: null,
          },
          loading: false,
          error: null,
        },
        characterBuilding: {
          characterBuildings: [],
          loading: false,
          error: null,
          selectedCharacterBuilding: null,
        },
        book: {
          books: [],
          loading: false,
          error: null,
        },
        scene: {
          scenes: [],
          loading: false,
          error: null,
        },
        character: {
          characters: [],
          loading: false,
          error: null,
        },
      });
      const thunk = getAllCharacterBuildings();
      const result = await thunk(mockDispatch, badState, undefined);
      expect(result.type).toBe("characterBuilding/getAll/rejected");
      expect(result.payload).toBe(
        "El usuario no está disponible o no tiene un ID válido.",
      );
    });

    it("dispatches rejected action if fetch fails", async () => {
      mockedHandleFetch.mockRejectedValueOnce(new Error("Fetch error"));

      const thunk = getAllCharacterBuildings();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/getAll/rejected");
      expect(result.payload).toBe("Fetch error");
    });

    it("dispatches rejected action if fetch returns no data", async () => {
      mockedHandleFetch.mockResolvedValueOnce(null);

      const thunk = getAllCharacterBuildings();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/getAll/rejected");
      expect(result.payload).toBe(
        "No se pudieron obtener los datos de los personajes",
      );
    });
  });

  describe("updateCharacterBuilding thunk", () => {
    const mockPayload = {
      id: "someId",
      center: "emotional",
      sceneCircumstances: "test",
      previousCircumstances: "test",
      startingPoint: "test",
      actionUnits: [
        {
          action: "test",
          strategies: ["test"],
        },
      ],
      relationshipCircumstances: [
        {
          character: "someCharId",
          circumstance: "test",
        },
      ],
    };

    it("dispatches fulfilled action with updated character building", async () => {
      mockedHandleFetch.mockResolvedValueOnce({});

      const thunk = updateCharacterBuilding(mockPayload);
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/update/fulfilled");
      expect(result.payload).toStrictEqual({});

      expect(mockedHandleFetch).toHaveBeenCalledWith(
        API_MAP.characterBuildings.update.url.replace(":id", mockPayload.id),
        expect.objectContaining({
          method: "PATCH",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
          body: expect.any(String),
        }),
      );
    });

    it("dispatches rejected action if token is missing", async () => {
      const badState = () => ({ auth: { token: null, user: {} } });

      const thunk = updateCharacterBuilding(mockPayload);
      const result = await thunk(mockDispatch, badState, undefined);

      expect(result.type).toBe("characterBuilding/update/rejected");
      expect(result.payload).toBe("No hay token disponible");
    });

    it("dispatches rejected action if fetch fails", async () => {
      mockedHandleFetch.mockRejectedValueOnce(new Error("Fetch error"));

      const thunk = updateCharacterBuilding(mockPayload);
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/update/rejected");
      expect(result.payload).toBe("Fetch error");
    });
  });

  describe("deleteCharacterBuilding thunk", () => {
    it("dispatches fulfilled action with deleted id", async () => {
      const id = "cb-1";
      mockedHandleFetch.mockResolvedValueOnce({});

      const thunk = deleteCharacterBuilding(id);
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("characterBuilding/delete/fulfilled");
      expect(result.payload).toBe(id);

      expect(mockedHandleFetch).toHaveBeenCalledWith(
        API_MAP.characterBuildings.delete.url.replace(":id", id),
        expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        }),
      );
    });

    it("dispatches rejected action if token is missing", async () => {
      const badState = () => ({ auth: { token: null, user: {} } });

      const thunk = deleteCharacterBuilding("cb-1");
      const result = await thunk(mockDispatch, badState, undefined);

      expect(result.type).toBe("characterBuilding/delete/rejected");
      expect(result.payload).toBe("No hay token disponible");
    });
  });
});
