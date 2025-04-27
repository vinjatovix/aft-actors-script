import { API_MAP } from '../../../src/constants';
import {
  getAllBooks,
  getBooksByAuthorId
} from '../../../src/redux/thunks/bookThunks';
import { handleFetch } from '../../../src/utils/handleFetch';

jest.mock('../../../src/utils/handleFetch');

describe('bookThunks', () => {
  const mockedHandleFetch = handleFetch as jest.Mock;
  const mockDispatch = jest.fn();

  const mockToken = 'mockToken';
  const mockGetState = () => ({
    auth: {
      token: mockToken
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks thunk', () => {
    it('dispatches fulfilled action with book data', async () => {
      const mockData = [
        {
          id: '1',
          title: 'Book 1',
          pages: 100
        },
        {
          id: '2',
          title: 'Book 2',
          pages: 200
        }
      ];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getAllBooks();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('books/getAll/fulfilled');
      expect(result.payload).toEqual(mockData);

      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.books.getAll.url}?include=author&fields=${encodeURIComponent('title,pages,author.name')}`,
        {
          method: API_MAP.books.getAll.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockToken}`
          }
        }
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });

    it('dispatches rejected action if token is missing', async () => {
      const thunk = getAllBooks();
      const result = await thunk(
        mockDispatch,
        () => ({ auth: { token: null } }),
        undefined
      );

      expect(result.type).toBe('books/getAll/rejected');
      expect(result.payload).toBe('No hay token disponible');
    });

    it('dispatches rejected action if fetch fails', async () => {
      const errorMessage = 'Error al obtener los libros';
      mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
      const thunk = getAllBooks();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('books/getAll/rejected');
      expect(result.payload).toBe(errorMessage);
    });
  });

  describe('getBooksByAuthorId thunk', () => {
    it('dispatches fulfilled action with book data', async () => {
      const authorId = 'authorId';
      const mockData = [
        {
          id: '1',
          title: 'Book 1',
          pages: 100
        },
        {
          id: '2',
          title: 'Book 2',
          pages: 200
        }
      ];
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getBooksByAuthorId(authorId);
      const result = await thunk(mockDispatch, mockGetState, undefined);
      const filter = encodeURIComponent(`author:${authorId}`);
      const fields = encodeURIComponent('title,author.name');
      const include = 'author';

      expect(result.type).toBe('books/getByAuthorId/fulfilled');
      expect(result.payload).toEqual(mockData);

      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.books.getAll.url}?filter=${filter}&fields=${fields}&include=${include}`,
        {
          method: API_MAP.books.getAll.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockToken}`
          }
        }
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });

    it('dispatches rejected action if token is missing', async () => {
      const authorId = 'authorId';
      const thunk = getBooksByAuthorId(authorId);
      const result = await thunk(
        mockDispatch,
        () => ({ auth: { token: null } }),
        undefined
      );

      expect(result.type).toBe('books/getByAuthorId/rejected');
      expect(result.payload).toBe('No hay token disponible');
    });

    it('dispatches rejected action if fetch fails', async () => {
      const authorId = 'authorId';
      const errorMessage = 'Error al obtener los libros';
      mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
      const thunk = getBooksByAuthorId(authorId);
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('books/getByAuthorId/rejected');
      expect(result.payload).toBe(errorMessage);
    });
  });
});
