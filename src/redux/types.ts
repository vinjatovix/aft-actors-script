import { ThunkDispatch } from "@reduxjs/toolkit";
import { Action } from "redux";
import { AuthState } from "./interfaces/authInterfaces";
import { BookState } from "./interfaces/bookInterfaces";
import { CharacterState } from "./interfaces/characterInterfaces";
import { SceneState } from "./interfaces/sceneInterfaces";
import { CharacterBuildingState } from "./interfaces/characterBuildingInterfaces";

export type RootState = {
  auth: AuthState;
  book: BookState;
  character: CharacterState;
  scene: SceneState;
  characterBuilding: CharacterBuildingState;
};

export type AppDispatch = ThunkDispatch<RootState, void, Action>;
