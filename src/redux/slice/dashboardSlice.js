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

export const allDashboardForStaff = createAsyncThunk(
  "dashboard/allDashboardForStaff",
  async () => {
    try {
      const response = await axios.get("/Dashboard/Staff");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const allRevenue = createAsyncThunk("dashboard/allRevenue", async () => {
  try {
    const response = await axios.get("/Revenue");
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const allRevenueOrder = createAsyncThunk(
  "dashboard/allRevenueOrder",
  async () => {
    try {
      const response = await axios.get("/Revenue/Order");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const allRevenueServiceOrder = createAsyncThunk(
  "dashboard/allRevenueServiceOrder",
  async () => {
    try {
      const response = await axios.get("/Revenue/ServiceOrder");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  allDashboardDTO: {},
  allLineDashboardDTO: {},
  allDashboardForStaffDTO: {},
  allRevenueDTO: {},
  allRevenueOrderDTO: {},
  allRevenueServiceOrderDTO: {},
  exportPdfFileDTO: {},
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
    setDashboardForStaff: (state, action) => {
      state.allDashboardForStaffDTO = action.payload;
    },
    setRevenue: (state, action) => {
      state.allRevenueDTO = action.payload;
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
    builder
      .addCase(allDashboardForStaff.pending, (state) => {
        state.msg = "Loading...";
        state.allDashboardForStaffDTO.loading = true;
      })
      .addCase(allDashboardForStaff.fulfilled, (state, action) => {
        state.allDashboardForStaffDTO.data = action.payload;
        state.msg = "Data loaded successfully";
        state.allDashboardForStaffDTO.loading = false;
      })
      .addCase(allDashboardForStaff.rejected, (state) => {
        state.msg = "Error loading data";
        state.allDashboardForStaffDTO.loading = false;
      });
    builder
      .addCase(allRevenue.pending, (state) => {
        state.msg = "Loading...";
        state.allRevenueDTO.loading = true;
      })
      .addCase(allRevenue.fulfilled, (state, action) => {
        state.allRevenueDTO.data = action.payload;
        state.msg = "Data loaded successfully";
        state.allRevenueDTO.loading = false;
      })
      .addCase(allRevenue.rejected, (state) => {
        state.msg = "Error loading data";
        state.allRevenueDTO.loading = false;
      });
    builder
      .addCase(allRevenueOrder.pending, (state) => {
        state.msg = "Loading...";
        state.allRevenueOrderDTO.loading = true;
      })
      .addCase(allRevenueOrder.fulfilled, (state, action) => {
        state.allRevenueOrderDTO.data = action.payload;
        state.msg = "Data loaded successfully";
        state.allRevenueOrderDTO.loading = false;
      })
      .addCase(allRevenueOrder.rejected, (state) => {
        state.msg = "Error loading data";
        state.allRevenueOrderDTO.loading = false;
      });
    builder
      .addCase(allRevenueServiceOrder.pending, (state) => {
        state.msg = "Loading...";
        state.allRevenueServiceOrderDTO.loading = true;
      })
      .addCase(allRevenueServiceOrder.fulfilled, (state, action) => {
        state.allRevenueServiceOrderDTO.data = action.payload;
        state.msg = "Data loaded successfully";
        state.allRevenueServiceOrderDTO.loading = false;
      })
      .addCase(allRevenueServiceOrder.rejected, (state) => {
        state.msg = "Error loading data";
        state.allRevenueServiceOrderDTO.loading = false;
      });
  },
});
const { reducer: dashboardReducer, actions } = dashboardSlice;
export const {
  setDashboard,
  setLineDashboard,
  setDashboardForStaff,
  setRevenue,
} = actions;
export { dashboardReducer as default };
