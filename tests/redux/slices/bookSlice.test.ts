import { BookState } from "../../../src/redux/interfaces/bookInterfaces";
import bookReducer from "../../../src/redux/slices/bookSlice";
import { API_MAP } from "../../../src/constants";
import { books } from "../../data";
import {
  getAllBooks,
  getBooksByAuthorId,
} from "../../../src/redux/thunks/bookThunks";
import { handleFetch } from "../../../src/utils/handleFetch";

jest.mock("../../../src/utils/handleFetch");

const authorId = "123";

const mockGetState = () => ({
  book: {
    books: [],
    loading: false,
    error: null,
  },
});

describe("bookSlice", () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();
  const INITIAL_STATE: BookState = {
    books: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedHandleFetch.mockImplementation(() => Promise.resolve(books));
    mockDispatch.mockImplementation(async (action) => {
      if (action.type === "books/getAll/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.books.getAll.url}?include=author&fields=title,pages,author.name`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "books/getAll/fulfilled",
          payload: result,
        });
      }
      if (action.type === "books/getByAuthorId/pending") {
        const result = await mockedHandleFetch(
          `${API_MAP.books.getAll.url}?filter=author:${authorId}&fields=title`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        mockDispatch({
          type: "books/getByAuthorId/fulfilled",
          payload: result,
        });
      }
      return action;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state", () => {
    const state = bookReducer(undefined, { type: "" });

    expect(state).toEqual(INITIAL_STATE);
  });

  it("should handle getAllBooks.pending", () => {
    const action = { type: getAllBooks.pending.type };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null,
    });
  });

  it("should handle getAllBooks.fulfilled", () => {
    const action = { type: getAllBooks.fulfilled.type, payload: books };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      books,
      error: null,
    });
  });

  it("should handle getAllBooks.rejected", () => {
    const action = { type: getAllBooks.rejected.type, payload: "Error" };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should handle getBooksByAuthorId.pending", () => {
    const action = { type: getBooksByAuthorId.pending.type };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null,
    });
  });

  it("should handle getBooksByAuthorId.fulfilled", () => {
    const action = { type: getBooksByAuthorId.fulfilled.type, payload: books };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      books,
      error: null,
    });
  });

  it("should handle getBooksByAuthorId.rejected", () => {
    const action = { type: getBooksByAuthorId.rejected.type, payload: "Error" };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: "Error",
    });
  });

  it("should call handleFetch with the correct URL for getAllBooks", async () => {
    const thunk = getAllBooks();

    await thunk(mockDispatch, mockGetState, undefined);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "books/getAll/pending",
      }),
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "books/getAll/fulfilled",
      payload: books,
    });
    expect(mockedHandleFetch).toHaveBeenCalledWith(
      `${API_MAP.books.getAll.url}?include=author&fields=title,pages,author.name`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("should call handleFetch with the correct URL for getBooksByAuthorId", async () => {
    const thunk = getBooksByAuthorId(authorId);

    await thunk(mockDispatch, mockGetState, undefined);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "books/getByAuthorId/pending",
      }),
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "books/getByAuthorId/fulfilled",
      payload: books,
    });
    expect(mockedHandleFetch).toHaveBeenCalledWith(
      `${API_MAP.books.getAll.url}?filter=author:${authorId}&fields=title`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("should handle error in getAllBooks", async () => {
    const errorMessage = "Error fetching books";
    mockedHandleFetch.mockRejectedValue(new Error(errorMessage));
    const action = { type: getAllBooks.rejected.type, payload: errorMessage };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: errorMessage,
    });
  });

  it("should handle error in getBooksByAuthorId", async () => {
    const errorMessage = "Error fetching books by author";
    mockedHandleFetch.mockRejectedValue(new Error(errorMessage));
    const action = {
      type: getBooksByAuthorId.rejected.type,
      payload: errorMessage,
    };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: errorMessage,
    });
  });

  it("should handle empty payload in getAllBooks", () => {
    const action = { type: getAllBooks.fulfilled.type, payload: [] };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      books: [],
      error: null,
    });
  });

  it("should handle empty payload in getBooksByAuthorId", () => {
    const action = { type: getBooksByAuthorId.fulfilled.type, payload: [] };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      books: [],
      error: null,
    });
  });

  it("should handle null payload in getAllBooks", () => {
    const action = { type: getAllBooks.fulfilled.type, payload: null };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      books: [],
      error: null,
    });
  });

  it("should handle null payload in getBooksByAuthorId", () => {
    const action = { type: getBooksByAuthorId.fulfilled.type, payload: null };

    const state = bookReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      books: [],
      error: null,
    });
  });
});
