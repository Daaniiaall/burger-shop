import { createSlice } from "@reduxjs/toolkit";

interface IngredientState {
  ingredientsValue: string[];
}

const initialState: IngredientState = {
  ingredientsValue: [],
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: initialState,
  reducers: {
    addToIngredients: (state, action) => {state.ingredientsValue.push(action.payload)},
    removeIngredient: (state, action) => {state.ingredientsValue = state.ingredientsValue.filter((item) => item !== action.payload)},
    deleteAllIngredients: (state ) => {state.ingredientsValue = []}
  },
});

export const { addToIngredients, removeIngredient , deleteAllIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;
