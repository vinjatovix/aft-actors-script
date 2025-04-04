import { Book } from "./bookInterfaces";
import { Metadata } from "./metadata";

export interface Character {
  id: string;
  name: string;
  book: Book;
  metadata?: Metadata;
}

export interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}
