import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllProductPagination = createAsyncThunk(
  "product/fetchTopProductsPagination",
  async ({ pageIndex = 0, pageSize = 20 }) => {
    try {
      const response = await axiosCus.get(
        `/Product/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const allCategory = createAsyncThunk("product/subCategory", async () => {
  try {
    const response = await axiosCus.get("/Category");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const filterTag = createAsyncThunk("product/tags", async () => {
  try {
    const response = await axiosCus.get("/Tag");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchAllProduct = createAsyncThunk(
  "product/fetchTopProducts",
  async ({ pageIndex, pageSize, minPrice, maxPrice, subCategory }) => {
    try {
      const response = await axiosCus.post(
        `/Product/Filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { minPrice, maxPrice, subCategory }
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response.data;
      const errorStatus = error.response.status;
      throw (error, errorMessage, errorStatus);
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

export const orderProduct = async (dataOrder) => {
  try {
    const res = await axiosCus.post("/Order", dataOrder);
    return res.data;
  } catch (err) {
    const errMessage = err.response;
    console.log(errMessage);
    throw (err, errMessage);
  }
};

const initialState = {
  topProductDTO: [],
  allProductNoPaginationDTO: {},
  allProductPaginationDTO: {},
  allProductDTO: {},
  allCategoryDTO: {},
  bonsaiOfficeDTO: [],
  tagDTO: {},
  productById: [],
  cart: [],
  pagination: {},
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
    setAllProductsPagintion: (state, action) => {
      state.allProductPaginationDTO = action.payload;
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
    setCategory: (state, action) => {
      state.subCategoryDTO = action.payload;
    },
    setTag: (state, action) => {
      state.tagDTO = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductNoPagination.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchAllProductNoPagination.fulfilled, (state, action) => {
        state.allProductNoPaginationDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchAllProductNoPagination.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchAllProductPagination.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchAllProductPagination.fulfilled, (state, action) => {
        state.allProductPaginationDTO = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchAllProductPagination.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchAllProduct.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.allProductDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.allProductDTO = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productById = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(allCategory.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(allCategory.fulfilled, (state, action) => {
        state.allCategoryDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(allCategory.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(filterTag.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(filterTag.fulfilled, (state, action) => {
        state.tagDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(filterTag.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      });
  },
});

const { reducer: productReducer, actions } = productSlice;
export const {
  setAllProductsNoPaginxtion,
  setAllProductsPagintion,
  setAllProducts,
  setBonsaiOffice,
  setCartFromCookie,
  setProdctById,
  setCategory,
} = actions;
export { productReducer as default };
