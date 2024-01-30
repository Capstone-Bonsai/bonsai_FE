import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { topProducts, bonsaiOffice } from "../data/TopProducts";
import { productList } from "../data/TopProducts";
export const fetchTopProducts = createAsyncThunk(
  "product/fetchTopProducts",
  async () => {
    return topProducts;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    try {
      const product = productList.find((p) => p.productId == productId);
      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw error;
    }
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
  productById: [],
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
      state.msg = "Loading...";
    });

    builder.addCase(fetchTopProducts.fulfilled, (state, action) => {
      state.topProductDTO = action.payload;
      state.msg = "Data loaded successfully";
    });

    builder.addCase(fetchTopProducts.rejected, (state) => {
      state.msg = "Error loading data";
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.msg = "Loading...";
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productById = action.payload;
      state.msg = "Data loaded successfully";
    });

    builder.addCase(fetchProductById.rejected, (state) => {
      state.msg = "Error loading data";
    });
  },
});

const { reducer: productReducer, actions } = productSlice;
export const { setTopProducts, setBonsaiOffice } = actions;
export { productReducer as default };
