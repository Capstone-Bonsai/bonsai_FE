import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const axiosCus = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});

export const fetchAllBonsaiPagination = createAsyncThunk(
  "bonsai/fetchAllBonsaiPagination",
  async ({ pageIndex, pageSize, keyword, category, style }) => {
    try {
      const response = await axiosCus.post(
        `/Bonsai/Filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { keyword, category, style }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllBonsaiNoPagination = createAsyncThunk(
  "bonsai/fetchBonsaisNoPagination",
  async () => {
    try {
      const response = await axiosCus.get(`/Bonsai`);
      console.log(response);
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

export const fetchAllBonsai = createAsyncThunk(
  "bonsai/fetchAllBonsai",
  async ({ pageIndex, pageSize, minPrice, maxPrice, category }) => {
    try {
      const response = await axiosCus.post(
        `/Bonsai/Filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { minPrice, maxPrice, category }
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response.data;
      const errorStatus = error.response.status;
      throw (error, errorMessage, errorStatus);
    }
  }
);

export const fetchBonsaiById = createAsyncThunk(
  "bonsai/fetchBonsaiById",
  async (bonsaiId) => {
    try {
      const response = await axiosCus.get(`/Bonsai/${bonsaiId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const orderBonsai = async (dataOrder) => {
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
  allBonsaiPaginationDTO: {},
  allBonsaiNoPagination: {},
  allBonsaiDTO: {},
  allCategoryDTO: {},
  tagDTO: {},
  bonsaiById: [],
  cart: [],
  pagination: {},
  itemCount: 0,
  loading: false,
  msg: "",
  token: null,
};

const bonsaiSlice = createSlice({
  name: "bonsai",
  initialState,
  reducers: {
    setAllBonsaiPagination: (state, action) => {
      state.allBonsaiPaginationDTO = action.payload;
    },
    setAllBonsai: (state, action) => {
      state.allBonsaiDTO = action.payload;
    },
    setCartFromCookie: (state, action) => {
      const { cartItems, itemCount } = action.payload;
      state.cart = cartItems;
      state.itemCount = itemCount;
    },
    setBonsaiById: (state, action) => {
      state.bonsaiById = action.payload;
    },
    setCategory: (state, action) => {
      state.subCategoryDTO = action.payload;
    },

    setBonsaiNoPagination: (state, action) => {
        state.allBonsaiNoPagination = action.payload;
      },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBonsaiPagination.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchAllBonsaiPagination.fulfilled, (state, action) => {
        state.allBonsaiPaginationDTO = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchAllBonsaiPagination.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchAllBonsai.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchAllBonsai.fulfilled, (state, action) => {
        state.allBonsaiDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchAllBonsai.rejected, (state) => {
        state.allBonsaiDTO = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(fetchAllBonsaiNoPagination.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchAllBonsaiNoPagination.fulfilled, (state, action) => {
        state.allBonsaiNoPagination = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchAllBonsaiNoPagination.rejected, (state) => {
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(fetchBonsaiById.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(fetchBonsaiById.fulfilled, (state, action) => {
        state.bonsaiById = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchBonsaiById.rejected, (state) => {
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

const { reducer: bonsaiReducer, actions } = bonsaiSlice;
export const {
  setAllBonsaiPagination,
  setAllBonsai,
  setCartFromCookie,
  setBonsaiById,
  setCategory,
  setBonsaiNoPagination
} = actions;
export { bonsaiReducer as default };
