import { API_MAP } from '../../../src/constants';
import { getAllAuthors } from '../../../src/redux/thunks/authorThunks';
import { handleFetch } from '../../../src/utils/handleFetch';
import { authors } from '../../data';

jest.mock('../../../src/utils/handleFetch');

const mockedHandleFetch = handleFetch as jest.Mock;
const mockDispatch = jest.fn();
const mockToken = 'mockToken';
const mockGetState = () => ({
  auth: {
    token: mockToken
  }
});

describe('authorThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAuthors thunk', () => {
    it('dispatches fulfilled action with author data', async () => {
      const mockData = authors;
      mockedHandleFetch.mockResolvedValueOnce(mockData);
      const thunk = getAllAuthors();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('authors/getAll/fulfilled');
      expect(result.payload).toEqual(mockData);

      expect(mockedHandleFetch).toHaveBeenCalledWith(
        `${API_MAP.authors.getAll.url}?`,
        {
          method: API_MAP.authors.getAll.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockToken}`
          }
        }
      );
      expect(mockDispatch).toHaveBeenCalledWith(result);
    });

    it('dispatches rejected action if token is missing', async () => {
      const thunk = getAllAuthors();
      const result = await thunk(
        mockDispatch,
        () => ({ auth: { token: null } }),
        undefined
      );

      expect(result.type).toBe('authors/getAll/rejected');
      expect(result.payload).toBe('No hay token disponible');
    });

    it('dispatches rejected action if fetch fails', async () => {
      const errorMessage = 'Error de red';
      mockedHandleFetch.mockRejectedValueOnce(new Error(errorMessage));
      const thunk = getAllAuthors();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('authors/getAll/rejected');
      expect(result.payload).toBe(errorMessage);
    });
  });
});
