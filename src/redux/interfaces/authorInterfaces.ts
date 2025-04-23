import { Metadata } from './metadata';

export interface Author {
  id: string;
  name: string;
  metadata?: Metadata;
}

export interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
}
