import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topProducts, bonsaiOffice } from "../../data/TopProducts";
import { productList } from "../../data/TopProducts";
import axios from "axios";

const axiosCus = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});

export const fetchAllProductNoPagination = createAsyncThunk(
  "product/fetchTopProductsNoPagination",
  async () => {
    try {
      const response = await axiosCus.get(`/Product`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllProduct = createAsyncThunk(
  "product/fetchTopProducts",
  async ({ pageIndex, pageSize, minPrice, maxPrice }) => {
    try {
      const response = await axiosCus.post(
        `/Product/Filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { minPrice, maxPrice }
      );
      
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    try {
      const response = await axiosCus.get(`/Product/${productId}`);
      return response.data;
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
  allProductNoPaginationDTO: [],
  allProductDTO: [],
  bonsaiOfficeDTO: [],
  productById: [],
  cart: [],
  itemCount: 0,
  loading: false,
  msg: "",
  token: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProductsNoPagintion: (state, action) => {
      state.allProductNoPaginationDTO = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProductDTO = action.payload;
    },
    setBonsaiOffice: (state, action) => {
      state.bonsaiOfficeDTO = action.payload;
    },
    setCartFromCookie: (state, action) => {
      const { cartItems, itemCount } = action.payload;
      state.cart = cartItems;
      state.itemCount = itemCount;
    },
    setProdctById: (state, action) => {
      state.productById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllProductNoPagination.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });

    builder.addCase(fetchAllProductNoPagination.fulfilled, (state, action) => {
      state.allProductNoPaginationDTO = action.payload;
      state.msg = "Data loaded successfully";
      state.loading = false;
    });
    builder.addCase(fetchAllProductNoPagination.rejected, (state) => {
      state.msg = "Error loading data";
      state.loading = false;
    });
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });

    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.allProductDTO = action.payload;
      state.msg = "Data loaded successfully";
      state.loading = false;
    });
    builder.addCase(fetchAllProduct.rejected, (state) => {
      state.msg = "Error loading data";
      state.loading = false;
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productById = action.payload;
      state.msg = "Data loaded successfully";
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.msg = "Error loading data";
      state.loading = false;
    });
  },
});

const { reducer: productReducer, actions } = productSlice;
export const {
  setAllProductsNoPagintion,
  setAllProducts,
  setBonsaiOffice,
  setCartFromCookie,
  setProdctById,
} = actions;
export { productReducer as default };
