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
    archive: (state, action) => {
      const { list, transaction } = action.payload;
      const index = list.indexOf(transaction);
      state.list[index].archived = true;
    },
    unArchive: (state, action) => {
      const { list, transaction } = action.payload;
      const index = list.indexOf(transaction);
      state.list[index].archived = undefined;
    },
    updateIsDeleted: (state, action) => {
      const { list, transaction } = action.payload;
      const index = list.indexOf(transaction);
      state.list[index].isDeleted = false;
    },
  },
});

export const { fetchData, remove, updateIsDeleted, archive, unArchive } =
  summarySlice.actions;

export default summarySlice.reducer;
