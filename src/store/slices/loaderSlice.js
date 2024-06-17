import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProcessing: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
});

export const { setProcessing } = loaderSlice.actions;
export default loaderSlice.reducer;
