import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { topProducts, bonsaiOffice } from "../data/TopProducts";

export const fetchTopProducts = createAsyncThunk(
  "product/fetchTopProducts",
  async () => {
    return topProducts;
  }
);

export const fetchBonsaiOffice = createAsyncThunk(
  "product/fetchBonsaiOffice",
  async () => {
    return bonsaiOffice;
  }
);

const initialState = {
  topProductDTO: [],
  bonsaiOfficeDTO: [],
  msg: "",
  token: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTopProducts: (state, action) => {
      state.topProductDTO = action.payload;
    },
    setBonsaiOffice: (state, action) => {
      state.bonsaiOfficeDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopProducts.pending, (state) => {
      // Xử lý khi đang chờ
      state.msg = "Loading...";
    });

    builder.addCase(fetchTopProducts.fulfilled, (state, action) => {
      // Xử lý khi thành công
      state.topProductDTO = action.payload;
      state.msg = "Data loaded successfully";
    });

    builder.addCase(fetchTopProducts.rejected, (state) => {
      // Xử lý khi bị từ chối
      state.msg = "Error loading data";
    });
    builder.addCase(fetchBonsaiOffice.pending, (state) => {
      // Xử lý khi đang chờ
      state.msg = "Loading...";
    });

    builder.addCase(fetchBonsaiOffice.fulfilled, (state, action) => {
      // Xử lý khi thành công
      state.bonsaiOfficeDTO = action.payload;
      state.msg = "Data loaded successfully";
    });

    builder.addCase(fetchBonsaiOffice.rejected, (state) => {
      // Xử lý khi bị từ chối
      state.msg = "Error loading data";
    });
  },
});

const { reducer: productReducer, actions } = productSlice;
export const { setTopProducts, setBonsaiOffice } = actions;
export { productReducer as default };
