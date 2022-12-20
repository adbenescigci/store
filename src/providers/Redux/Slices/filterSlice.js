import { createSlice } from '@reduxjs/toolkit';
import { transT, paymentT } from '../../../utils/filterTypes';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    transTypes: transT,
    paymentTypes: paymentT,
  },
  reducers: {
    updateTransTypes: (state, action) => {
      state.transTypes = action.payload;
    },
    updatePaymentTypes: (state, action) => {
      state.paymentTypes = action.payload;
    },
    setDefault: (state) => {
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
