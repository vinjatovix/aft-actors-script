import { AuthState } from '../../../src/redux/interfaces/authInterfaces';
import authReducer from '../../../src/redux/slices/authSlice';
import { users } from '../../data';
import {
  loginUser,
  refreshAuthToken,
  registerUser,
  updatePassword
} from '../../../src/redux/thunks/authThunks';

describe('authSlice', () => {
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

  it('should return the initial state', () => {
    const state = authReducer(undefined, { type: '' });

    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        token: 'mockToken',
        user: users[0]
      }
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      token: action.payload.token,
      user: action.payload.user,
      loading: false,
      error: null
    });
  });

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Error de autenticación'
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      token: null,
      user: INITIAL_STATE.user,
      error: action.payload
    });
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null
    });
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false
    });
  });

  it('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Error de registro'
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: action.payload
    });
  });

  it('should handle refreshAuthToken.pending', () => {
    const action = { type: refreshAuthToken.pending.type };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true
    });
  });

  it('should handle refreshAuthToken.fulfilled', () => {
    const action = {
      type: refreshAuthToken.fulfilled.type,
      payload: {
        token: 'mockToken',
        user: users[0]
      }
    };
    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      token: action.payload.token,
      user: action.payload.user
    });
  });

  it('should handle refreshAuthToken.rejected', () => {
    const action = {
      type: refreshAuthToken.rejected.type,
      payload: 'Error de actualización de token'
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      token: null,
      user: INITIAL_STATE.user,
      error: action.payload
    });
  });

  it('should handle updatePassword.pending', () => {
    const action = { type: updatePassword.pending.type };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: null
    });
  });

  it('should handle updatePassword.fulfilled', () => {
    const action = {
      type: updatePassword.fulfilled.type
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false
    });
  });

  it('should handle updatePassword.rejected', () => {
    const action = {
      type: updatePassword.rejected.type,
      payload: 'Error al actualizar la contraseña'
    };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: action.payload
    });
  });

  it('should handle clearError', () => {
    const action = { type: 'auth/clearError' };

    const state = authReducer(INITIAL_STATE, action);

    expect(state).toEqual({
      ...INITIAL_STATE,
      error: null
    });
  });

  it('should handle logout', () => {
    const action = { type: 'auth/logout' };

    const state = authReducer({
      ...INITIAL_STATE,
      token: 'mockToken',
      user: users[0]
    }, action);

    expect(state).toEqual(INITIAL_STATE);
  });
});
