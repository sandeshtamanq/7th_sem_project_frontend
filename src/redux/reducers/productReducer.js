import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    fetchProductsAction: (state, action) => {
      state.products = action.payload;
    },
    filterProductsAction: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { fetchProductsAction, filterProductsAction } = productSlice.actions;
export default productSlice.reducer;
