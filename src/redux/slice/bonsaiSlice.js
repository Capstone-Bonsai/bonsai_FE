import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "./../../utils/axiosCustomize";

const axiosCus = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});

export const fetchAllBonsaiPagination = createAsyncThunk(
  "bonsai/fetchAllBonsaiPagination",
  async ({ pageIndex, pageSize, keyword, category, style }) => {
    try {
      const response = await axios.post(
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

export const addBonsaiToCart = createAsyncThunk(
  "bonsai/addBonsaiToCart",
  async (listBonsai) => {
    try {
      const response = await axios.post(`/Bonsai/CurrentCart`, listBonsai);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const customerBonsai = createAsyncThunk(
  "bonsai/CustomerBonsai",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/CustomerBonsai/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const customerBonsaiById = createAsyncThunk(
  "bonsai/customerBonsaiById",
  async (bonsaiId) => {
    try {
      const response = await axios.get(`/CustomerBonsai/${bonsaiId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchBonsaiWithCateCayTrac = createAsyncThunk(
  "bonsai/fetchAllBonsaiPaginationCayTrac",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/Bonsai/Category?pageIndex=${pageIndex}&pageSize=${pageSize}&categoryId=96feef97-a25c-4849-832f-08dc3f32bfc0`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchBonsaiWithCateCayThong = createAsyncThunk(
  "bonsai/fetchAllBonsaiPaginationCayThong",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/Bonsai/Category?pageIndex=${pageIndex}&pageSize=${pageSize}&categoryId=603b484b-7faa-40e6-6b22-08dc40005bf3`
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
      const response = await axios.get(`/Bonsai`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const allCategory = createAsyncThunk("product/subCategory", async () => {
  try {
    const response = await axios.get("/Category");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const bonsaiBought = createAsyncThunk(
  "bonsai/bonsaiBought",
  async () => {
    try {
      const response = await axios.get("/bonsai/BoughtBonsai");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const filterTag = createAsyncThunk("product/tags", async () => {
  try {
    const response = await axios.get("/Tag");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchAllBonsai = createAsyncThunk(
  "bonsai/fetchAllBonsai",
  async ({
    pageIndex,
    pageSize,
    minPrice,
    maxPrice,
    category,
    style,
    keyword,
  }) => {
    try {
      const response = await axios.post(
        `/Bonsai/Filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { minPrice, maxPrice, category, style, keyword }
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
      const response = await axios.get(`/Bonsai/${bonsaiId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const orderBonsai = async (dataOrder) => {
  try {
    const res = await axios.post("/Order", dataOrder);
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
  bonsaiCayTrac: [],
  bonsaiInCart: [],
  customerBonsai: {},
  customerBonsaiDetail: {},
  bonsaiCayThong: [],
  allBonsaiDTO: {},
  allCategoryDTO: {},
  boughtBonsai: [],
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
      const { itemCount } = action.payload;
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
      })
      .addCase(fetchBonsaiWithCateCayTrac.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(fetchBonsaiWithCateCayTrac.fulfilled, (state, action) => {
        state.bonsaiCayTrac = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchBonsaiWithCateCayTrac.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchBonsaiWithCateCayThong.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(fetchBonsaiWithCateCayThong.fulfilled, (state, action) => {
        state.bonsaiCayThong = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchBonsaiWithCateCayThong.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(bonsaiBought.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(bonsaiBought.fulfilled, (state, action) => {
        state.boughtBonsai = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(bonsaiBought.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(addBonsaiToCart.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(addBonsaiToCart.fulfilled, (state, action) => {
        state.bonsaiInCart = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(addBonsaiToCart.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(customerBonsai.pending, (state) => {
        state.msg = "Loading...";
        state.customerBonsai.loading = true;
      })
      .addCase(customerBonsai.fulfilled, (state, action) => {
        state.customerBonsai = action.payload;
        state.msg = "Data loaded successfully";
        state.customerBonsai.loading = false;
      })
      .addCase(customerBonsai.rejected, (state) => {
        state.msg = "Error loading data";
        state.customerBonsai.loading = false;
      })
      .addCase(customerBonsaiById.pending, (state) => {
        state.msg = "Loading...";
        state.customerBonsaiDetail.loading = true;
      })
      .addCase(customerBonsaiById.fulfilled, (state, action) => {
        state.customerBonsaiDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.customerBonsaiDetail.loading = false;
      })
      .addCase(customerBonsaiById.rejected, (state) => {
        state.msg = "Error loading data";
        state.customerBonsaiDetail.loading = false;
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
  setBonsaiNoPagination,
} = actions;
export { bonsaiReducer as default };
