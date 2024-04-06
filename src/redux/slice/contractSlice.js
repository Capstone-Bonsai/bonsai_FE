import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allContract = createAsyncThunk(
  "contract/allContract",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(`/Contract/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  allContractDTO: {},
  pagination: {},
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
      .addCase(allContract.pending, (state) => {
        state.msg = "Loading...";
        state.allContractDTO.loading = true;
      })
      .addCase(allContract.fulfilled, (state, action) => {
        state.allContractDTO.contracts = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.msg = "Data loaded successfully";
        state.allContractDTO.loading = false;
      })
      .addCase(allContract.rejected, (state) => {
        state.msg = "Error loading data";
        state.allContractDTO.loading = false;
      });
  },
});
const { reducer: contractReducer, actions } = contractSlice;
export const { setContract } = actions;
export { contractReducer as default };
