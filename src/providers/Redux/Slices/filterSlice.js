import { createSlice } from "@reduxjs/toolkit";
import { transT, goldT, paymentT } from "../../../utils/filterTypes";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    goldTypes: goldT,
    transTypes: transT,
    paymentTypes: paymentT,
  },
  reducers: {
    updateGoldTypes: (state, action) => {
      state.goldTypes = action.payload;
    },
    updateTransTypes: (state, action) => {
      state.transTypes = action.payload;
    },
    updatePaymentTypes: (state, action) => {
      state.paymentTypes = action.payload;
    },
    setDefault: (state) => {
      state.goldTypes = goldT;
      state.transTypes = transT;
      state.paymentTypes = paymentT;
    },
  },
});

export const {
  updateGoldTypes,
  updateTransTypes,
  updatePaymentTypes,
  setDefault,
} = filterSlice.actions;

export default filterSlice.reducer;
