import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/authInterfaces";
import { handleFetch } from "../../utils/handleFetch";
import { CharacterBuilding } from "../interfaces/characterBuildingInterfaces";
import { API_MAP } from "../../constants";
import { handleError } from "../../utils/handleError";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const getAllCharacterBuildings = createAsyncThunk(
  "characterBuilding/getAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const queryParams = new URLSearchParams({
        include:
          "character.book.author,scene.characters,actor,relationshipCircumstances.character",
        fields:
          "previousCircumstances,sceneCircumstances,center,relationshipCircumstances.circumstance,relationshipCircumstances.character.name,scene.description,actor.username,actionUnits,center,character.name,character.book.title,character.book.author.name",
      }).toString();
      const url = `${API_MAP.characterBuildings.getAll.url}?${queryParams}`;
      const data = await handleFetch<CharacterBuilding[]>(url, {
        method: API_MAP.characterBuildings.getAll.method,
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
