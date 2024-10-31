import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../products/ProductsSlice";

interface ProductsState {
  editProductValue: Product;
}
const initialState: ProductsState = {
  editProductValue: {
    _id: "",
    name: "",
    ingredients: [],
    isVegan: false,
    category: "",
    weight: "",
    calory: "",
    price: "",
    image: "",
  },
};

const editProductSlice = createSlice({
  name: "editProduct",
  initialState: initialState,
  reducers: {
    setEditProducts: (state, action) => {
      state.editProductValue = action.payload;
    },
    resetEditProduct: (state) => {
      state.editProductValue = initialState.editProductValue;
    },
  },
});

export const { setEditProducts, resetEditProduct } = editProductSlice.actions;
export default editProductSlice.reducer;
