import { createSlice } from "@reduxjs/toolkit";

export const AciveChatSlice = createSlice({
  name: "Single",
  initialState: {
    active: null,
  },
  reducers: {
    activeChat: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { activeChat } = AciveChatSlice.actions;

export default AciveChatSlice.reducer;
