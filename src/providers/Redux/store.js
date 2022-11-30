import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "./Slices/summarySlice";
import filterReducer from "./Slices/filterSlice";

export default configureStore({
  reducer: {
    summary: summaryReducer,
    filter: filterReducer,
  },
});
