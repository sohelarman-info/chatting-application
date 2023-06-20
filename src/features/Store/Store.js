import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/UserSlice";
import activeSingleSlice from "../slice/activeSingleSlice";

const store = configureStore({
  reducer: {
    loginSlice: userSlice,
    active: activeSingleSlice,
  },
});

export default store;
