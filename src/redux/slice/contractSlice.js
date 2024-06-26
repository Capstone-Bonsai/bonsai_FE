import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allServiceGarden = createAsyncThunk(
  "contract/allServiceGarden",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/ServiceGarden/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const listAllContract = createAsyncThunk(
  "contract/allContract",
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
  "contract/listTaskInContract",
  async (contractId) => {
    try {
      const response = await axios.get(`/Task/${contractId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createContract = async (payload) => {
  try {
    const response = await axios.post(`Contract`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const paymentContract = async (contractId) => {
  try {
    const res = await axios.get(`/ServiceOrder/Payment?ContractId=${contractId}`);
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

export const serviceGardenByServiceId = createAsyncThunk(
  "contract/serviceGardenByServiceId",
  async (serviceId) => {
    try {
      const response = await axios.get(`/ServiceGarden/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const contractDetailById = createAsyncThunk(
  "contract/contractDetail",
  async (contractId) => {
    try {
      const response = await axios.get(`/ServiceOrder/${contractId}`);
      return response.data;
    } catch (error) {
      const resError = error.response.data;
      return { error: resError };
    }
  }
);

const initialState = {
  listContractDTO: {},
  allContractDTO: {},
  listTaskDTO: {},
  allServiceGardenDTO: {},
  contractDetail: {},
  pagination: {},
  contractServiceDetail: {},
  msg: "",
  token: null,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContract: (state, action) => {
      state.allContractDTO = action.payload;
    },
    setServiceGarden: (state, action) => {
      state.allServiceGardenDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allServiceGarden.pending, (state) => {
        state.msg = "Loading...";
        state.allServiceGardenDTO.loading = true;
      })
      .addCase(allServiceGarden.fulfilled, (state, action) => {
        state.allServiceGardenDTO.contracts = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.msg = "Data loaded successfully";
        state.allServiceGardenDTO.loading = false;
      })
      .addCase(allServiceGarden.rejected, (state) => {
        state.msg = "Error loading data";
        state.allContractDTO.loading = false;
      })
      .addCase(serviceGardenByServiceId.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(serviceGardenByServiceId.fulfilled, (state, action) => {
        state.allContractDTO.contracts = action.payload;
        state.msg = "Data loaded successfully";
        state.allContractDTO.contracts.loading = false;
      })
      .addCase(serviceGardenByServiceId.rejected, (state) => {
        state.msg = "Error loading data";
        state.allContractDTO.contracts.loading = false;
      })
      .addCase(listAllContract.pending, (state) => {
        state.msg = "Loading...";
        state.listContractDTO.loading = true;
      })
      .addCase(listAllContract.fulfilled, (state, action) => {
        state.listContractDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.listContractDTO.loading = false;
      })
      .addCase(listAllContract.rejected, (state) => {
        state.msg = "Error loading data";
        state.listContractDTO.loading = false;
      })
      .addCase(contractDetailById.pending, (state) => {
        state.msg = "Loading...";
        state.contractDetail.loading = true;
      })
      .addCase(contractDetailById.fulfilled, (state, action) => {
        state.contractDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.contractDetail.loading = false;

      })
      .addCase(contractDetailById.rejected, (state, action) => {
        state.msg = "Error loading data";
        state.contractDetail.loading = false;
        state.contractDetail.error = action.payload.error;
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
      });
  },
});
const { reducer: contractReducer, actions } = contractSlice;
export const { setContract, setServiceGarden } = actions;
export { contractReducer as default };
