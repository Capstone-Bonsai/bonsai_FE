import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allServiceGarden = createAsyncThunk(
  "contract/allServiceGarden",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/ServiceGarden/Manager/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
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
        `/Contract/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
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
      const response = await axios.get(`/Contract/${contractId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listContractDTO: {},
  allContractDTO: {},
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
        state.loading = true;
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
        state.loading = true;
      })
      .addCase(contractDetailById.fulfilled, (state, action) => {
        state.contractDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.contractDetail.loading = false;
      })
      .addCase(contractDetailById.rejected, (state) => {
        state.msg = "Error loading data";
        state.contractDetail.loading = false;
      });
  },
});
const { reducer: contractReducer, actions } = contractSlice;
export const { setContract } = actions;
export { contractReducer as default };
