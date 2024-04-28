import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allDashboard = createAsyncThunk(
  "dashboard/allDashboard",
  async () => {
    try {
      const response = await axios.get("/Dashboard");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const allLineDashboard = createAsyncThunk(
  "dashboard/allLineDashboard",
  async () => {
    try {
      const response = await axios.get("/Dashboard/RevenueLineGraph");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  allDashboardDTO: {},
  allLineDashboardDTO: {},
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
    setLineDashboard: (state, action) => {
      state.allLineDashboardDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allDashboard.pending, (state) => {
        state.msg = "Loading...";
        state.allDashboardDTO.loading = true;
      })
      .addCase(allDashboard.fulfilled, (state, action) => {
        state.allDashboardDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.allDashboardDTO.loading = false;
      })
      .addCase(allDashboard.rejected, (state) => {
        state.msg = "Error loading data";
        state.allDashboardDTO.loading = false;
      });
    builder
      .addCase(allLineDashboard.pending, (state) => {
        state.msg = "Loading...";
        state.allLineDashboardDTO.loading = true;
      })
      .addCase(allLineDashboard.fulfilled, (state, action) => {
        state.allLineDashboardDTO.data = action.payload;
        state.msg = "Data loaded successfully";
        state.allLineDashboardDTO.loading = false;
      })
      .addCase(allLineDashboard.rejected, (state) => {
        state.msg = "Error loading data";
        state.allLineDashboardDTO.loading = false;
      });
  },
});
const { reducer: dashboardReducer, actions } = dashboardSlice;
export const { setDashboard, setLineDashboard } = actions;
export { dashboardReducer as default };
