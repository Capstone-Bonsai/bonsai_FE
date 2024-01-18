import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  topProductDTO: [],
  msg: "",
  token: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
const {
  reducer: productReducer,
} = productSlice;
export { productReducer as default };
