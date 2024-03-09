import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allCategory = createAsyncThunk("bonsai/category", async () => {
  try {
    const response = await axios.get("/Category");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  allCategoryDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.allProductNoPaginationDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});
const { reducer: categoryReducer, actions } = productSlice;
export const {
  setCategory
} = actions;
export { categoryReducer as default };