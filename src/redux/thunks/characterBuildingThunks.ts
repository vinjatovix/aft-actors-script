import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/authInterfaces";
import { handleFetch } from "../../utils/handleFetch";
import { CharacterBuilding } from "../interfaces/characterBuildingInterfaces";
import { API_MAP } from "../../constants";
import { handleError } from "../../utils/handleError";
import { RootState } from "../types";

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

const validateAuthState = (auth: AuthState) => {
  const { token, user } = auth;

  if (!token) {
    throw new Error("No hay token disponible");
  }
  if (!user?.id) {
    throw new Error("El usuario no está disponible o no tiene un ID válido.");
  }
  return { token, user };
};

export const getAllCharacterBuildings = createAsyncThunk<
  CharacterBuilding[],
  void,
  { state: RootState; rejectValue: string }
>("characterBuilding/getAll", async (_, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState() as { auth: AuthState };
    const { token, user } = validateAuthState(auth);

    const queryParams = new URLSearchParams({
      include:
        "character.book.author,scene.characters,actor,relationshipCircumstances.character",
      fields:
        "startingPoint,previousCircumstances,sceneCircumstances,center,relationshipCircumstances.circumstance,relationshipCircumstances.character.name,scene.description,scene.characters.name,actor.username,actionUnits,center,character.name,character.book.title,character.book.author.name",
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

    if (!data) {
      throw new Error("No se pudieron obtener los datos de los personajes");
    }

    return data;
  } catch (error) {
    return rejectWithValue(handleError(error, "Erro ao obte-las persoaxes"));
  }
});

export const createCharacterBuilding = createAsyncThunk(
  "characterBuilding/create",
  async (
    characterBuilding: {
      id: string;
      character: { id: string; name: string };
      book: { id: string; title: string };
      scene: {
        id: string;
        description: string;
        characters: {
          id: string;
          name: string;
        }[];
      };
      author: { id: string; name: string };
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const { token, user } = validateAuthState(auth);

      const payload = {
        id: characterBuilding.id,
        scene: characterBuilding.scene.id,
        character: characterBuilding.character.id,
        actor: user.id,
        relationshipCircumstances: [],
        actionUnits: [],
        sceneCircumstances: "",
        previousCircumstances: "",
        startingPoint: "",
        center: "instinctive",
      };
      const url = API_MAP.characterBuildings.create.url;
      await handleFetch<CharacterBuilding>(url, {
        method: API_MAP.characterBuildings.create.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const metadata = {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: user.id,
        updatedBy: user.id,
      };
      return {
        ...payload,
        scene: {
          id: characterBuilding.scene.id,
          description: characterBuilding.scene.description,
          characters: characterBuilding.scene.characters,
        },
        character: {
          id: characterBuilding.character.id,
          name: characterBuilding.character.name,
          book: {
            id: characterBuilding.book.id,
            title: characterBuilding.book.title,
            author: {
              id: characterBuilding.author.id,
              name: characterBuilding.author.name,
            },
          },
        },
        metadata,
        actor: {
          id: user.id,
          username: user.username as string,
        },
      };
    } catch (error) {
      return rejectWithValue(handleError(error, "Erro ó crea-la persoaxe"));
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
      const { auth } = getState() as { auth: AuthState };
      const { token } = validateAuthState(auth);

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

export const deleteCharacterBuilding = createAsyncThunk(
  "characterBuilding/delete",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const { token } = validateAuthState(auth);

      const url = `${API_MAP.characterBuildings.delete.url.replace(":id", id)}`;
      await handleFetch(url, {
        method: API_MAP.characterBuildings.delete.method,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      return rejectWithValue(
        handleError(error, "Error ao eliminar o persoaxe"),
      );
    }
  },
);
