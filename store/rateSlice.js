import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kgData: { kg: "", customerRate: "", ourRate: "", total: "" },
  cbmData: { cbm: "", customerRate: "", ourRate: "", total: "" },
};

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    setKgData: (state, action) => {
      state.kgData = action.payload;
    },
    setCbmData: (state, action) => {
      state.cbmData = action.payload;
    },
    resetData: (state) => {
      state.kgData = initialState.kgData;
      state.cbmData = initialState.cbmData;
    },
  },
});

export const { setKgData, setCbmData, resetData } = rateSlice.actions;
export default rateSlice.reducer;
