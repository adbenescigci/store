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
    // undo:(state,action)=>{
    //   state.list
    // }
  },
});

export const { fetchData, remove, undo } = summarySlice.actions;

export default summarySlice.reducer;
