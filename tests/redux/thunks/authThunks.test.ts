import { API_MAP } from '../../../src/constants';
import {
  loginUser,
  registerUser,
  refreshAuthToken,
  updatePassword
} from '../../../src/redux/thunks/authThunks';
import { handleFetch } from '../../../src/utils/handleFetch';
import {
  AuthLoginResponse,
  AuthState
} from '../../../src/redux/interfaces/authInterfaces';
import { users } from '../../data';

jest.mock('../../../src/utils/handleFetch');
jest.mock('../../../src/utils/getUserFromToken', () => ({
  getUserFromToken: jest.fn(() => users[0])
}));

const MOCK_TOKEN = 'test-token';
const EMAIL = users[0].email;
const PASSWORD = 'SuperSecur3Password%';

const DEFAULT_RESPONSE: AuthLoginResponse = {
  token: MOCK_TOKEN,
  user: users[0]
};

const INITIAL_STATE: AuthState = {
  token: null,
  user: {
    username: null,
    id: null,
    roles: [],
    email: null
  },
  loading: false,
  error: null
};

const mockDispatch = jest.fn((action) => {
  if (typeof action === 'function') {
    return action(mockDispatch, () => INITIAL_STATE, {});
  }
  return action;
}) as jest.Mock;

const mockHandleFetchImplementation = async (
  url: string
): Promise<AuthLoginResponse | null> => {
  if (
    url.includes(API_MAP.auth.register.url) ||
    url.includes(API_MAP.auth.updatePassword.url)
  )
    return null;

  if (
    url.includes(API_MAP.auth.login.url) ||
    url.includes(API_MAP.auth.refreshToken.url)
  ) {
    return DEFAULT_RESPONSE;
  }

  throw new Error('Unknown error');
};

const setupMocks = () => {
  jest.clearAllMocks();
  localStorage.clear();
  (handleFetch as jest.Mock).mockImplementation(mockHandleFetchImplementation);
};

describe('authThunks', () => {
  beforeEach(setupMocks);

  describe('loginUser Thunk', () => {
    const payload = { email: EMAIL, password: PASSWORD };

    it('dispatches fulfilled action with correct data', async () => {
      const thunk = loginUser(payload);
      const result = await thunk(mockDispatch, () => INITIAL_STATE, {});

      expect(handleFetch).toHaveBeenCalledWith(
        expect.stringMatching(API_MAP.auth.login.url),
        expect.objectContaining({
          method: API_MAP.auth.login.method,
          body: JSON.stringify(payload)
        })
      );
      expect(result.type).toBe(loginUser.fulfilled.type);
      expect(result.payload).toStrictEqual(DEFAULT_RESPONSE);
      expect(localStorage.getItem('token')).toBe(MOCK_TOKEN);
    });

    it('dispatches rejected action on error', async () => {
      (handleFetch as jest.Mock).mockRejectedValue(new Error('Login failed'));
      const thunk = loginUser(payload);
      const result = await thunk(mockDispatch, () => INITIAL_STATE, {});

      expect(result.type).toBe(loginUser.rejected.type);
      expect(result.payload).toBe('Login failed');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('registerUser Thunk', () => {
    const payload = {
      id: '1',
      username: users[0].username,
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: PASSWORD
    };

    it('dispatches fulfilled action with correct data', async () => {
      const thunk = registerUser(payload);
      const result = await thunk(mockDispatch, () => INITIAL_STATE, {});

      expect(handleFetch).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(API_MAP.auth.register.url),
        expect.objectContaining({
          method: API_MAP.auth.register.method,
          body: JSON.stringify(payload)
        })
      );
      expect(handleFetch).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(API_MAP.auth.login.url),
        expect.objectContaining({
          method: API_MAP.auth.login.method,
          body: JSON.stringify({ email: EMAIL, password: PASSWORD })
        })
      );
      expect(result.type).toBe(registerUser.fulfilled.type);
      expect(result.payload).toStrictEqual(DEFAULT_RESPONSE);
      expect(localStorage.getItem('token')).toBe(MOCK_TOKEN);
    });

    it('dispatches rejected action on error', async () => {
      (handleFetch as jest.Mock).mockRejectedValue(
        new Error('Registration failed')
      );
      const thunk = registerUser(payload);
      const result = await thunk(mockDispatch, () => INITIAL_STATE, {});

      expect(result.type).toBe(registerUser.rejected.type);
      expect(result.payload).toBe('Registration failed');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('refreshAuthToken Thunk', () => {
    it('dispatches fulfilled action with correct data', async () => {
      localStorage.setItem('token', 'old-token');
      const thunk = refreshAuthToken();
      const result = await thunk(mockDispatch, () => INITIAL_STATE, {});

      expect(handleFetch).toHaveBeenCalledWith(
        expect.stringMatching(API_MAP.auth.refreshToken.url),
        expect.objectContaining({
          method: API_MAP.auth.refreshToken.method
        })
      );
      expect(result.type).toBe(refreshAuthToken.fulfilled.type);
      expect(result.payload).toStrictEqual(DEFAULT_RESPONSE);
      expect(localStorage.getItem('token')).toBe(MOCK_TOKEN);
    });

    it('dispatches rejected action on error', async () => {
      (handleFetch as jest.Mock).mockRejectedValue(
        new Error('Token refresh failed')
      );
      localStorage.setItem('token', 'old-token');
      const thunk = refreshAuthToken();
      const result = await thunk(mockDispatch, () => INITIAL_STATE, {});

      expect(result.type).toBe(refreshAuthToken.rejected.type);
      expect(result.payload).toBe('Token refresh failed');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('updatePassword Thunk', () => {
    const payload = {
      password: PASSWORD,
      oldPassword: PASSWORD,
      repeatPassword: PASSWORD
    };

    const mockAuthenticatedState = () => ({
      ...INITIAL_STATE,
      auth: {
        token: MOCK_TOKEN,
        user: users[0],
        loading: false,
        error: null
      }
    });

    it('dispatches fulfilled action with correct data', async () => {
      const thunk = updatePassword(payload);
      const result = await thunk(mockDispatch, mockAuthenticatedState, {});

      expect(handleFetch).toHaveBeenCalledWith(
        API_MAP.auth.updatePassword.url,
        expect.objectContaining({
          method: API_MAP.auth.updatePassword.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${MOCK_TOKEN}`
          },
          body: JSON.stringify(payload)
        })
      );
      expect(result.type).toBe(updatePassword.fulfilled.type);
    });

    it('dispatches rejected action on error', async () => {
      (handleFetch as jest.Mock).mockRejectedValue(
        new Error('Update password failed')
      );
      const thunk = updatePassword(payload);
      const result = await thunk(mockDispatch, mockAuthenticatedState, {});

      expect(result.type).toBe(updatePassword.rejected.type);
      expect(result.payload).toBe('Update password failed');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
