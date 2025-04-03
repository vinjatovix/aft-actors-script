import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/authInterfaces";
import { handleFetch } from "../../utils/handleFetch";
import { CharacterBuilding } from "../interfaces/characterBuildingInterfaces";
import { API_MAP } from "../../constants";
import { handleError } from "../../utils/handleError";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

interface CharacterBuildingPatch {
  id: string;
  center: string;
  sceneCircumstances: string;
  previousCircumstances: string;
  startingPoint: string;
  actionUnits: { action: string; strategies: string[] }[];
  relationshipCircumstances: { character: string; circumstance: string }[];
}

export const getAllCharacterBuildings = createAsyncThunk(
  "characterBuilding/getAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const { token, user } = auth;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const queryParams = new URLSearchParams({
        include:
          "character.book.author,scene.characters,actor,relationshipCircumstances.character",
        fields:
          "startingPoint,previousCircumstances,sceneCircumstances,center,relationshipCircumstances.circumstance,relationshipCircumstances.character.name,scene.description,scene.characters,actor.username,actionUnits,center,character.name,character.book.title,character.book.author.name",
        filter: `actor:${user.id}`,
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

export const updateCharacterBuilding = createAsyncThunk(
  "characterBuilding/update",
  async (
    characterBuilding: CharacterBuildingPatch,
    { rejectWithValue, getState },
  ) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error("No hay token disponible");
      }

      const url = `${API_MAP.characterBuildings.update.url.replace(
        ":id",
        characterBuilding.id,
      )}`;
      const data = await handleFetch<CharacterBuilding>(url, {
        method: API_MAP.characterBuildings.update.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(characterBuilding),
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        handleError(error, "Error ao actualizar o persoaxe"),
      );
    }
  },
);
