import { createSlice } from '@reduxjs/toolkit';
import theme from '../theme';

const initialState = {
  darkModeOn: false,
  backgroundColor: theme.colors.white,
  textColor: theme.colors.black,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      const { black, white } = theme.colors;
      state.backgroundColor = action.payload ? black : white;
      state.textColor = action.payload ? white : black;
      state.darkModeOn = action.payload;
    },
  },
});

export const { setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
