import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    title: "",
    brand: "",
    productAmount: "",
    price: 0,
    description: "",
    image: "",
    reviews: [],
  },
  reducers: {
    fetchProductDetailAction: (state, action) => {
      state.title = action.payload.productName;
      state.brand = action.payload.brandName.brandName;
      state.productAmount = action.payload.productAmount;
      state.price = action.payload.productPrice;
      state.description = action.payload.productDescription;
      state.image = action.payload.productImage;
      state.reviews = action.payload.reviews;
    },
    updateProductDetailAction: (state, action) => {
      state.productAmount = state.productAmount - action.payload;
    },

    updateProductAmount: (state, action) => {
      if (action.payload === "add") {
        state.productAmount = state.productAmount - 1;
      }
      if (action.payload === "remove") {
        state.productAmount = state.productAmount + 1;
      }
    },
    addProductReview: (state, action) => {
      state.reviews = [action.payload, ...state.reviews];
    },
  },
});

export const { fetchProductDetailAction, updateProductDetailAction, updateProductAmount, addProductReview } = productDetailSlice.actions;
export default productDetailSlice.reducer;
