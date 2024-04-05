import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allCareStep = createAsyncThunk(
  "careStep/allCareStep",
  async (categoryId) => {
    try {
      console.log(categoryId);
      const response = await axios.get(`/CareStep/${categoryId}`);
      return response.data;
    } catch (error) {
      onsole.log(error);
      throw error;
    }
  }
);

const initialState = {
  allCareStepDTO: {},
  pagination: {},
  loading: false,
  msg: "",
  token: null,
};

const careStepSlice = createSlice({
  name: "careStep",
  initialState,
  reducers: {
    setCareStep: (state, action) => {
      state.allCareStepDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allCareStep.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(allCareStep.fulfilled, (state, action) => {
        state.allCareStepDTO = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(allCareStep.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      });
  },
});
const { reducer: careStepReducer, actions } = careStepSlice;
export const { setCareStep } = actions;
export { careStepReducer as default };
