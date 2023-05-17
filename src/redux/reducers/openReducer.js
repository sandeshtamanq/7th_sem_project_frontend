import { createSlice } from "@reduxjs/toolkit";

const openSlice = createSlice({
  name: "open",
  initialState: {
    open: false,
  },
  reducers: {
    openAction: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openAction } = openSlice.actions;
export default openSlice.reducer;
