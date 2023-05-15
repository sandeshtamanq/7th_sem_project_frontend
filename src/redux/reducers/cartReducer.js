import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productAmount: 0,
  },
  reducers: {
    fetchCartAmount: (state, action) => {
      state.productAmount = action.payload;
    },
    addCartProduct: (state, action) => {
      state.productAmount = state.productAmount + action.payload;
    },
    clearCart: (state) => {
      state.productAmount = 0;
    },
  },
});

export const { fetchCartAmount, addCartProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
