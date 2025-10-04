import { configureStore } from "@reduxjs/toolkit";
import rateReducer from "./rateSlice";

export const store = configureStore({
  reducer: {
    rate: rateReducer,
  },
});
