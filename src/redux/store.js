import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import productDetailReducer from "./reducers/productDetailReducer";
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  productDetail: productDetailReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
