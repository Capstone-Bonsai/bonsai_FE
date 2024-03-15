import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
export const fetchService = createAsyncThunk(
  "bonsai/fetchService",
  async ({ page, size }) => {
    try {
      const response = await axios.get(`/Service?page=${page}&size=${size}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "bonsai/fetchServiceById",
  async (serviceId) => {
    try {
      const response = await axios.get(`/Service/${serviceId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  serviceDTO: {},
  serviceById: {},
  loading: false,
  msg: "",
  token: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setService: (state, action) => {
      state.serviceDTO = action.payload;
    },
    setServiceById: (state, action) => {
      state.serviceById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchService.fulfilled, (state, action) => {
        state.serviceDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchService.rejected, (state) => {
        state.serviceDTO = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.serviceById = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchServiceById.rejected, (state) => {
        state.serviceById = {};
        state.msg = "Không tìm thấy";
        state.loading = false;
      });
  },
});

const { reducer: serviceReducer, actions } = serviceSlice;
export const { setService, setServiceById } = actions;
export { serviceReducer as default };
