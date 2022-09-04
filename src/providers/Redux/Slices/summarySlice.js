import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    list: [],
  },
  reducers: {
    fetchData: (state, action) => {
      state.list = action.payload;
    },
    remove: (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
  },
});

export const { fetchData, remove } = summarySlice.actions;

export default summarySlice.reducer;
