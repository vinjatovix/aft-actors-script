import { Character } from "./characterInterfaces";
import { Metadata } from "./metadata";
import { Scene } from "./sceneInterfaces";

export interface CharacterBuilding {
  id: string;
  metadata: Metadata;
  center: string;
  sceneCircumstances: string;
  previousCircumstances: string;
  actionUnits: {
    id: string;
    action: string;
    strategies: string[];
  }[];
  character: Character;
  scene: Scene;
  actor: {
    id: string;
    username: string;
  };
  relationshipCircumstances: {
    character: Character;
    circumstance: string;
  }[];
}

export interface CharacterBuildingState {
  characterBuildings: CharacterBuilding[];
  loading: boolean;
  error: string | null;
}
