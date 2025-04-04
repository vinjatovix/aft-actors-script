import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_MAP } from "../../constants";
import { handleFetch } from "../../utils/handleFetch";
import { handleError } from "../../utils/handleError";
import { Book } from "../interfaces/bookInterfaces";
import { AuthState } from "../interfaces/authInterfaces";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const getAllBooks = createAsyncThunk(
  "books/getAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const queryParams = new URLSearchParams({
        include: "author",
        fields: "title,pages,author.name",
      }).toString();
      const url = `${API_MAP.books.getAll.url}?${queryParams}`;
      const data = await handleFetch<Book[]>(url, {
        method: API_MAP.books.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error al obtener los libros"));
    }
  },
);

export const getBooksByAuthorId = createAsyncThunk(
  "books/getByAuthorId",
  async (authorId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const queryParams = new URLSearchParams({
        filter: `author:${authorId}`,
        fields: "title",
      }).toString();
      const url = `${API_MAP.books.getAll.url}?${queryParams}`;
      const data = await handleFetch<Book[]>(url, {
        method: API_MAP.books.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error al obtener los libros"));
    }
  },
);
