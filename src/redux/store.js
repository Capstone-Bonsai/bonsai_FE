// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";
import orderReducer from "./slice/orderSlice";
import tagReducer from "./slice/tagSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    tag: tagReducer,
  },
});

export default store;
