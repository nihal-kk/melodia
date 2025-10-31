import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accentColor: "#FF9E2E", // Default orange color
  backgroundColor: "#0D0D0D",
  textColor: "#EAEAEA",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    resetTheme: () => initialState,
  },
});

export const {
  setAccentColor,
  setBackgroundColor,
  setTextColor,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
