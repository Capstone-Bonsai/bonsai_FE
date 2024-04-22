import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allServiceOrder = createAsyncThunk(
  "serviceOrder/allServiceOrder",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/ServiceOrder/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const listTask = createAsyncThunk(
  "serviceOrder/listTaskInServiceOrder",
  async (serviceOrderId) => {
    try {
      const response = await axios.get(`/Task/${serviceOrderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createServiceOrder = async (payload) => {
  try {
    const response = await axios.post(`ServiceOrder`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const paymentServiceOrder = async (contractId) => {
  try {
    const res = await axios.get(
      `/ServiceOrder/Payment?ContractId=${contractId}`
    );
    return res.data;
  } catch (err) {
    const errMessage = err.response;
    console.log(errMessage);
    throw (err, errMessage);
  }
};

export const addComplaint = async (formData) => {
  try {
    const res = await axios.post(`/Complaint`, formData);
    return res.data;
  } catch (err) {
    const errMessage = err.response.data;
    console.log(errMessage);
    throw (err, errMessage);
  }
};

export const serviceOrder = async (payload) => {
  try {
    const res = await axios.post(`/ServiceOrder`, payload);
    return res.data;
  } catch (err) {
    const errMessage = err.response.data;
    console.log(errMessage);
    throw (err, errMessage);
  }
};

// export const serviceGardenByServiceId = createAsyncThunk(
//   "serviceOrder/serviceGardenByServiceId",
//   async (serviceId) => {
//     try {
//       const response = await axios.get(`/ServiceGarden/${serviceId}`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const serviceOrderById = createAsyncThunk(
  "serviceOrder/serviceOrderById",
  async (serviceOrderId) => {
    try {
      const response = await axios.get(`/ServiceOrder/${serviceOrderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const servicePackageById = createAsyncThunk(
  "serviceOrder/servicePackageById",
  async (servicePackageId) => {
    try {
      const response = await axios.get(`/Service/${servicePackageId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  allServiceOrderDTO: {},
  listTaskDTO: {},
  servicePackageDetail: {},
  serviceOrderDetail: {},
  pagination: {},
  msg: "",
  token: null,
};

const serviceOrderSlice = createSlice({
  name: "serviceOrder",
  initialState,
  reducers: {
    setServiceOrder: (state, action) => {
      state.allServiceOrderDTO = action.payload;
    },
    setServiceOrderDetail: (state, action) => {
      state.serviceOrderDetail = action.payload;
    },
    setListTaskDTO: (state, action) => {
      state.listTaskDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allServiceOrder.pending, (state) => {
        state.msg = "Loading...";
        state.allServiceOrderDTO.loading = true;
      })
      .addCase(allServiceOrder.fulfilled, (state, action) => {
        state.allServiceOrderDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.allServiceOrderDTO.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.allServiceOrderDTO.loading = false;
      })
      .addCase(allServiceOrder.rejected, (state) => {
        state.msg = "Error loading data";
        state.allServiceOrderDTO.loading = false;
      })
      .addCase(serviceOrderById.pending, (state) => {
        state.msg = "Loading...";
        state.serviceOrderDetail.loading = true;
      })
      .addCase(serviceOrderById.fulfilled, (state, action) => {
        state.serviceOrderDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.serviceOrderDetail.loading = false;
      })
      .addCase(serviceOrderById.rejected, (state) => {
        state.msg = "Error loading data";
        state.serviceOrderDetail.loading = false;
      })
      .addCase(listTask.pending, (state) => {
        state.msg = "Loading...";
        state.listTaskDTO.loading = true;
      })
      .addCase(listTask.fulfilled, (state, action) => {
        state.listTaskDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.listTaskDTO.loading = false;
      })
      .addCase(listTask.rejected, (state) => {
        state.msg = "Error loading data";
        state.listTaskDTO.loading = false;
      })
      .addCase(servicePackageById.pending, (state) => {
        state.msg = "Loading...";
        state.servicePackageDetail.loading = true;
      })
      .addCase(servicePackageById.fulfilled, (state, action) => {
        state.servicePackageDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.servicePackageDetail.loading = false;
      })
      .addCase(servicePackageById.rejected, (state) => {
        state.msg = "Error loading data";
        state.servicePackageDetail.loading = false;
      });
  },
});
const { reducer: serviceOrderReducer, actions } = serviceOrderSlice;
export const { setListTaskDTO, setServiceOrder, setServiceOrderDetail } =
  actions;
export { serviceOrderReducer as default };
