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

export const careStep = async (categoryId) => {
  try {
    const response = await axios.get(`/CareStep/${categoryId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const initialState = {
  allCategoryDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.allCategoryDTO = action.payload;
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
const { reducer: categoryReducer, actions } = categorySlice;
export const { setCategory } = actions;
export { categoryReducer as default };
