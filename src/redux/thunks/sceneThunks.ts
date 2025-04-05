import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_MAP } from "../../constants";
import { handleFetch } from "../../utils/handleFetch";
import { handleError } from "../../utils/handleError";
import { AuthState } from "../interfaces/authInterfaces";
import { Scene } from "../interfaces/sceneInterfaces";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const getAllScenes = createAsyncThunk(
  "scenes/getAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const queryParams = new URLSearchParams({
        include: "characters.book.author",
        fields:
          "description,characters.name,characters.book.title,characters.book.author.name",
      }).toString();
      const url = `${API_MAP.scenes.getAll.url}?${queryParams}`;
      const data = await handleFetch<Scene[]>(url, {
        method: API_MAP.scenes.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error al obter os persoaxes"));
    }
  },
);

export const getScenesByCharacterId = createAsyncThunk(
  "scenes/getByCharacterId",
  async (characterId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const queryParams = new URLSearchParams({
        filter: `characters:${characterId}`,
        fields: "description,characters.name",
        include: "characters",
      }).toString();
      const url = `${API_MAP.scenes.getAll.url}?${queryParams}`;
      const data = await handleFetch<Scene[]>(url, {
        method: API_MAP.scenes.getAll.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error al obter os persoaxes"));
    }
  },
);
