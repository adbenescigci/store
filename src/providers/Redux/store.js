import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "./Slices/summarySlice";

export default configureStore({
  reducer: {
    summary: summaryReducer,
  },
});
