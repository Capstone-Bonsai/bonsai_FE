// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";
import orderReducer from "./slice/orderSlice";
import avatarReducer from "./slice/avatarSlice";
import bonsaiReducer from "./slice/bonsaiSlice";
import categoryReducer from "./slice/categorySlice";
import serviceReducer from "./slice/serviceSlice";
import styleReducer from "./slice/styleSlice";
import gardenReducer from "./slice/userGarden";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    avatar: avatarReducer,
    bonsai: bonsaiReducer,
    category: categoryReducer,
    service: serviceReducer,
    style: styleReducer,
    garden: gardenReducer,
  },
});

export default store;
