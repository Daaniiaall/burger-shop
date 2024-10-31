import { createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  displayProductValue: object;
}
const initialState: ProductsState = {
  displayProductValue: {},
};

const displayProductSlice = createSlice({
  name: "displayProduct",
  initialState: initialState,
  reducers: {
    setDisplayProduct: (state, action) => {
      state.displayProductValue = action.payload;
    },
    resetDisplayProduct: (state) => {
      state.displayProductValue = initialState.displayProductValue;
    },
  },
});

export const { setDisplayProduct, resetDisplayProduct } = displayProductSlice.actions;
export default displayProductSlice.reducer;
