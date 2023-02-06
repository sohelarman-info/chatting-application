import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/UserSlice";

const store = configureStore({
  reducer: {
    loginSlice: userSlice,
  },
});

export default store;
