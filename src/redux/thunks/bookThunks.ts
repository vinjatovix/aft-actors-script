import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_MAP } from '../../constants';
import { handleFetch } from '../../utils/handleFetch';
import { handleError } from '../../utils/handleError';
import { Book } from '../interfaces/bookInterfaces';
import { AuthState } from '../interfaces/authInterfaces';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const validateAuthState = (auth: AuthState) => {
  const { token, user } = auth;

  if (!token) {
    throw new Error('No hay token disponible');
  }
  if (!user?.id) {
    throw new Error('El usuario no está disponible o no tiene un ID válido.');
  }
  return { token, user };
};

export const getAllBooks = createAsyncThunk(
  'books/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token }
      } = getState() as { auth: AuthState };

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const queryParams = new URLSearchParams({
        include: 'author',
        fields: 'title,pages,author.name'
      }).toString();
      const url = `${API_MAP.books.getAll.url}?${queryParams}`;
      const data = await handleFetch<Book[]>(url, {
        method: API_MAP.books.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        }
      });

      return data?.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      return rejectWithValue(handleError(error, 'Error al obtener los libros'));
    }
  }
);

export const getBooksByAuthorId = createAsyncThunk(
  'books/getByAuthorId',
  async (authorId: string, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token }
      } = getState() as { auth: AuthState };

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const queryParams = new URLSearchParams({
        filter: `author:${authorId}`,
        fields: 'title,author.name',
        include: 'author'
      }).toString();
      const url = `${API_MAP.books.getAll.url}?${queryParams}`;
      const data = await handleFetch<Book[]>(url, {
        method: API_MAP.books.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        }
      });

      return data?.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      return rejectWithValue(handleError(error, 'Error al obtener los libros'));
    }
  }
);

export const createBook = createAsyncThunk(
  'books/create',
  async (
    book: {
      id: string;
      title: string;
      author: string;
      isbn: string;
      releaseDate: string;
      pages: number;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const { token, user } = validateAuthState(auth);

      const payload = {
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        releaseDate: book.releaseDate,
        pages: book.pages
      };
      const url = API_MAP.books.create.url;
      await handleFetch<Book>(url, {
        method: API_MAP.books.create.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const metadata = {
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        updatedBy: user.id,
        updatedAt: new Date().toISOString()
      };

      return {
        ...payload,
        metadata
      };
    } catch (error) {
      return rejectWithValue(handleError(error, 'Error al crear el libro'));
    }
  }
);
