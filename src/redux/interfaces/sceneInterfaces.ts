import { Character } from "./characterInterfaces";
import { Metadata } from "./metadata";

export interface Scene {
  id: string;
  description: string;
  characters: Character[];
  metadata?: Metadata;
}

export interface SceneState {
  scenes: Scene[];
  loading: boolean;
  error: string | null;
}
