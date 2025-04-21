import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { AuthState } from './interfaces/authInterfaces';
import { BookState } from './interfaces/bookInterfaces';
import { CharacterState } from './interfaces/characterInterfaces';
import { SceneState } from './interfaces/sceneInterfaces';
import { CharacterBuildingState } from './interfaces/characterBuildingInterfaces';
import { LangState } from './interfaces/langInterfaces';

export type RootState = {
  auth: AuthState;
  book: BookState;
  character: CharacterState;
  scene: SceneState;
  characterBuilding: CharacterBuildingState;
  language: LangState;
};

export type AppDispatch = ThunkDispatch<RootState, void, Action>;
