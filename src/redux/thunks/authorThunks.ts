import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_MAP } from '../../constants';
import { handleFetch } from '../../utils/handleFetch';
import { handleError } from '../../utils/handleError';

import { AuthState } from '../interfaces/authInterfaces';
import { Author } from '../interfaces/authorInterfaces';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const getAllAuthors = createAsyncThunk(
  'authors/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token }
      } = getState() as { auth: AuthState };

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const queryParams = new URLSearchParams({}).toString();
      const url = `${API_MAP.authors.getAll.url}?${queryParams}`;
      const data = await handleFetch<Author[]>(url, {
        method: API_MAP.authors.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Error al obtener los autores')
      );
    }
  }
);
