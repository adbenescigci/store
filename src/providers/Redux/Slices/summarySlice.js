import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    list: [],
    index: "",
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
      state.index = index;
    },
    unArchive: (state) => {
      state.list[state.index].archived = undefined;
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
