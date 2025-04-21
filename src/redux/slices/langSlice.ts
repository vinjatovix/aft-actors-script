import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LangState {
  language: string;
}

const initialState: LangState = {
  language: localStorage.getItem('language') ?? 'es-GL'
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    }
  }
});

export const { setLanguage } = langSlice.actions;

export default langSlice.reducer;
