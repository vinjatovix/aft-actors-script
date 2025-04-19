import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleFetch } from '../../utils/handleFetch';
import { API_MAP } from '../../constants';

import { getUserFromToken } from '../../utils/getUserFromToken';
import {
  AuthLoginResponse,
  AuthState,
  LoginPayload,
  RegisterPayload,
  UpdatePasswordPayload
} from '../interfaces/authInterfaces';
import { handleError } from '../../utils/handleError';

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

const removeToken = () => {
  localStorage.removeItem('token');
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await handleFetch<AuthLoginResponse>(
        API_MAP.auth.login.url,
        {
          method: API_MAP.auth.login.method,
          headers: DEFAULT_HEADERS,
          body: JSON.stringify(payload)
        }
      );

      if (!data) {
        return rejectWithValue('Error de autenticación');
      }

      saveToken(data.token);

      return { token: data.token, user: getUserFromToken(data.token) };
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Ocurrió un error desconocido')
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { dispatch, rejectWithValue }) => {
    try {
      await handleFetch(API_MAP.auth.register.url, {
        method: API_MAP.auth.register.method,
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload)
      });

      const loginResult = await dispatch(
        loginUser({ email: payload.email, password: payload.password })
      ).unwrap();

      return loginResult;
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Ocurrió un error desconocido')
      );
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return { token: null, user: null };

    try {
      const data = await handleFetch<AuthLoginResponse>(
        API_MAP.auth.refreshToken.url,
        {
          method: API_MAP.auth.refreshToken.method,
          headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!data?.token) {
        throw new Error('No se pudo refrescar el token');
      }

      saveToken(data.token);
      return { token: data.token, user: getUserFromToken(data.token) };
    } catch (error) {
      removeToken();
      return rejectWithValue(handleError(error, 'Error al refrescar el token'));
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (payload: UpdatePasswordPayload, { rejectWithValue, getState }) => {
    const { auth } = getState() as { auth: AuthState };
    const { token } = auth;
    if (!token) {
      return rejectWithValue('No se encontró el token de autenticación');
    }

    try {
      const data = await handleFetch(API_MAP.auth.updatePassword.url, {
        method: API_MAP.auth.updatePassword.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Error al actualizar la contraseña')
      );
    }
  }
);
