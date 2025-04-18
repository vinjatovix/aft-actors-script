import { Metadata } from "./metadata";

export interface Book {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    metadata?: Metadata;
  };
  metadata?: Metadata;
  pages?: number;
}

export interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}
