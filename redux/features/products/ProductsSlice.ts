import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  _id: string;
  name: string;
  ingredients: string[];
  isVegan: boolean;
  category: string;
  weight: string;
  calory: string;
  price: string;
  image?: string;
}

interface ProductsState {
  allProducts: Product[];
  productsValue: Product[];
}

const initialState: ProductsState = {
  allProducts: [],
  productsValue: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.productsValue = action.payload;
    },
    addToProducts: (state, action) => {
      state.productsValue = [...state.productsValue, action.payload];
    },
    updateProduct: (state, action) => {
      const editedIndex = state.productsValue.findIndex(
        (item) => item._id === action.payload._id
      );
      state.productsValue[editedIndex] = action.payload;
    },
  },
});

export const { addAllProducts, addToProducts, setProducts, updateProduct } = productSlice.actions;
export default productSlice.reducer;
