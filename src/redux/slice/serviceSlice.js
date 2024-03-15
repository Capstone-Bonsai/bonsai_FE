import axios from "./../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const fetchAllService = createAsyncThunk(
  "service/fetchAllService",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/Service?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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
  "service/fetchServiceById",
  async (serviceId) => {
    try {
      const response = await axios.get(`/Service/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const allServiceType = createAsyncThunk(
  "service/allServiceType",
  async () => {
    try {
      const response = await axios.get("/Service/ServiveType");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listService: {},
  serviceDTO: {},
  serviceById: {},
  allServiceTypeDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceType: (state, action) => {
      state.allServiceTypeDTO = action.payload;
    },
    setAllService: (state, action) => {
      state.listService = action.payload;
    },
    setService: (state, action) => {
      state.serviceDTO = action.payload;
    },
    setServiceById: (state, action) => {
      state.serviceById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllService.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });

    builder.addCase(fetchAllService.fulfilled, (state, action) => {
      state.listService = action.payload;
      state.pagination = {
        current: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize,
        total: action.payload.totalItemsCount,
      };
      state.loading = false;
    });
    builder.addCase(fetchAllService.rejected, (state) => {
      toast.error("Bạn không có quyền truy cập vào tính năng này!");
      state.loading = false;
    });
    builder.addCase(fetchServiceById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchServiceById.fulfilled, (state, action) => {
      state.serviceById = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchServiceById.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(allServiceType.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });
    builder.addCase(allServiceType.fulfilled, (state, action) => {
      state.allServiceTypeDTO = action.payload;
      state.msg = "Data loaded successfully";
      state.loading = false;
    });
    builder.addCase(allServiceType.rejected, (state) => {
      state.msg = "Error loading data";
      state.loading = false;
    });
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
      });
  },
});
const { reducer: serviceReducer, actions } = serviceSlice;
export const { setService, setAllService, setServiceById, setServiceType } =
  actions;
export { serviceReducer as default };
