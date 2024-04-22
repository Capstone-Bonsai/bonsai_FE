import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allDashboard = createAsyncThunk("dashboard/allDashboard", async () => {
  try {
    const response = await axios.get("/Dashboard");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  allDashboardDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      state.allDashboardDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allDashboard.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(allDashboard.fulfilled, (state, action) => {
        state.allDashboardDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(allDashboard.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      });
  },
});
const { reducer: dashboardReducer, actions } = dashboardSlice;
export const { setDashboard } = actions;
export { dashboardReducer as default };
