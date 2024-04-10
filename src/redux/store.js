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
import baseTaskReducer from "./slice/baseTaskSlice";
import customerBonsaiReducer from "./slice/customerBonsaiSlice";
import careStepReducer from "./slice/careStepSlice";
import contractReducer from "./slice/contractSlice";
import gardenerReducer from "./slice/gardener";

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
    baseTask: baseTaskReducer,
    customerBonsai: customerBonsaiReducer,
    careStep: careStepReducer,
    contract: contractReducer,
    gardener: gardenerReducer,
  },
});

export default store;
