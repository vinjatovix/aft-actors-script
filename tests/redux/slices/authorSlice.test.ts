import { AuthorState } from '../../../src/redux/interfaces/authorInterfaces';
import authorReducer from '../../../src/redux/slices/authorSlice';
import { API_MAP } from '../../../src/constants';
import { authors } from '../../data';
import { getAllAuthors } from '../../../src/redux/thunks/authorThunks';
import { handleFetch } from '../../../src/utils/handleFetch';

jest.mock('../../../src/utils/handleFetch');

const mockedHandleFetch = handleFetch as jest.Mock;
const mockDispatch = jest.fn();
const INITIAL_STATE: AuthorState = {
  authors: [],
  loading: false,
  error: null
};

describe('authorSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedHandleFetch.mockImplementation(() => Promise.resolve(authors));
    mockDispatch.mockImplementation(async (action) => {
      if (action.type === 'authors/getAll/pending') {
        const result = await mockedHandleFetch(
          `${API_MAP.authors.getAll.url}`,
          {
            method: API_MAP.authors.getAll.method,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        mockDispatch({
          type: 'authors/getAll/fulfilled',
          payload: result
        });
      }
      return action;
    });
  });

  it('should return the initial state', () => {
    expect(authorReducer(undefined, { type: '' })).toEqual(INITIAL_STATE);
  });

  it('should handle getAllAuthors.pending', () => {
    const action = { type: getAllAuthors.pending.type };
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
      error: null
    };
    expect(authorReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle getAllAuthors.fulfilled', () => {
    const action = { type: getAllAuthors.fulfilled.type, payload: authors };
    const expectedState = {
      ...INITIAL_STATE,
      loading: false,
      authors
    };
    expect(authorReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle getAllAuthors.rejected', () => {
    const action = { type: getAllAuthors.rejected.type, payload: 'Error' };
    const expectedState = {
      ...INITIAL_STATE,
      loading: false,
      error: 'Error'
    };
    expect(authorReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle createAuthor.pending', () => {
    const action = { type: 'authors/create/pending' };
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
      error: null
    };
    expect(authorReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle createAuthor.fulfilled', () => {
    const newAuthor = { id: '3', name: 'New Author' };
    const action = {
      type: 'authors/create/fulfilled',
      payload: newAuthor
    };
    const expectedState = {
      ...INITIAL_STATE,
      loading: false,
      authors: [...INITIAL_STATE.authors, newAuthor]
    };
    expect(authorReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle createAuthor.rejected', () => {
    const action = { type: 'authors/create/rejected', payload: 'Error' };
    const expectedState = {
      ...INITIAL_STATE,
      loading: false,
      error: 'Error'
    };
    expect(authorReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
});
