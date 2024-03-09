// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";
import orderReducer from "./slice/orderSlice";
import avatarReducer from "./slice/avatarSlice";
import tagReducer from "./slice/tagSlice";
import bonsaiReducer from "./slice/bonsaiSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    tag: tagReducer,
    avatar: avatarReducer,
    bonsai: bonsaiReducer
  },
});

export default store;
