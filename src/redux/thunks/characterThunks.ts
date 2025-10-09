import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_MAP } from '../../constants';
import { handleError } from '../../utils/handleError';
import { handleFetch } from '../../utils/handleFetch';
import { AuthState } from '../interfaces/authInterfaces';
import { Character } from '../interfaces/characterInterfaces';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const getAllCharacters = createAsyncThunk(
  'characters/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const queryParams = new URLSearchParams({
        include: 'book.author',
        fields: 'name,book.title,book.author.name'
      }).toString();
      const url = `${API_MAP.characters.getAll.url}?${queryParams}`;
      const data = await handleFetch<Character[]>(url, {
        method: API_MAP.characters.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, 'Error al obter os persoaxes'));
    }
  }
);

export const getCharactersByBookId = createAsyncThunk(
  'characters/getByBookId',
  async (bookId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const queryParams = new URLSearchParams({
        filter: `book:${bookId}`,
        fields: 'name'
      }).toString();
      const url = `${API_MAP.characters.getAll.url}?${queryParams}`;
      const data = await handleFetch<Character[]>(url, {
        method: API_MAP.characters.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        }
      });

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, 'Error ao obter os persoaxes'));
    }
  }
);
