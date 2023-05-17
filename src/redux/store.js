import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import productDetailReducer from "./reducers/productDetailReducer";
import openReducer from "./reducers/openReducer";
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  productDetail: productDetailReducer,
  open: openReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
