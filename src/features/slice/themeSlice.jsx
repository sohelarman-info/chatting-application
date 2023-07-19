import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "DarkMode",
  initialState: {
    DarkTheme: localStorage.getItem("dark")
      ? JSON.parse(localStorage.getItem("dark"))
      : false,
  },
  reducers: {
    DarkModeTheme: (state, action) => {
      state.DarkTheme = action.payload;
    },
  },
});

export const { DarkModeTheme } = themeSlice.actions;

export default themeSlice.reducer;
