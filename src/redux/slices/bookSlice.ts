import { createSlice } from "@reduxjs/toolkit";
import { getAllBooks, getBooksByAuthorId } from "../thunks/bookThunks";
import { Book } from "../interfaces/bookInterfaces";

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload ?? [];
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBooksByAuthorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooksByAuthorId.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload ?? [];
      })
      .addCase(getBooksByAuthorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
