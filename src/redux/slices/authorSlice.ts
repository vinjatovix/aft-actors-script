import { createSlice } from '@reduxjs/toolkit';
import { AuthorState } from '../interfaces/authorInterfaces';
import { createAuthor, getAllAuthors } from '../thunks/authorThunks';

const initialState: AuthorState = {
  authors: [],
  loading: false,
  error: null
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload ?? [];
      })
      .addCase(getAllAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.authors.push(action.payload);
        }
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default authorSlice.reducer;
