import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./features/ingredients/ingredientsSlice";
import productsReducer from "./features/products/ProductsSlice";
import editProductReducer from "./features/editProducts/editProductSlice";
import displayProductReducer from "./features/displayProducts/displayProductSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    products: productsReducer,
    editProduct: editProductReducer,
    displayProduct: displayProductReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
