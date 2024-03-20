import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allBaseTask = createAsyncThunk(
  "baseTask/allBaseTask",
  async () => {
    try {
      const response = await axios.get("/BaseTask");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const allBaseTaskPagination = createAsyncThunk(
  "baseTask/allBaseTaskPagination",
  async ({ pageIndex, pageSize }) => {
    try {
      console.log(pageSize);
      const response = await axios.get(
        `/BaseTask/Pagination?page=${pageIndex}&size=${pageSize}`
      )
      
      return response.data;
    } catch (error) {
      onsole.log(error);
      throw error;
    }
  }
);

const initialState = {
  allBaseTaskDTO: [],
  allBaseTaskDTOPagination: {},
  pagination: {},
  loading: false,
  msg: "",
  token: null,
};

const baseTaskSlice = createSlice({
  name: "baseTask",
  initialState,
  reducers: {
    setBaseTask: (state, action) => {
      state.allBaseTaskDTO = action.payload;
    },
    setBaseTaskPagination: (state, action) => {
      state.allBaseTaskDTOPagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allBaseTask.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(allBaseTask.fulfilled, (state, action) => {
        state.allBaseTaskDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(allBaseTask.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      });
    builder
      .addCase(allBaseTaskPagination.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(allBaseTaskPagination.fulfilled, (state, action) => {
        state.allBaseTaskDTOPagination = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(allBaseTaskPagination.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      });
  },
});
const { reducer: baseTaskReducer, actions } = baseTaskSlice;
export const { setBaseTask, setBaseTaskPagination } = actions;
export { baseTaskReducer as default };
