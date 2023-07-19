import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/UserSlice";
import activeSingleSlice from "../slice/activeSingleSlice";
import themeSlice from "../slice/themeSlice";

const store = configureStore({
  reducer: {
    loginSlice: userSlice,
    active: activeSingleSlice,
    themeChange: themeSlice,
  },
});

export default store;
