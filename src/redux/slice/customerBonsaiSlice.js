import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../utils/axiosCustomize";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const 
fetchCustomerBonsaisByGardenId = createAsyncThunk(
  "customerBonsai/fetchCustomerBonsaisByGardenId",
  async (gardenId) => {
    try {
      const response = await axios.get(
        `/CustomerBonsai/CustomerGarden/${gardenId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const customerBonsaiDetail = createAsyncThunk(
  "customerBonsai/customerBonsaiDetail",
  async (bonsaiId) => {
    try {
      const response = await axios.get(`/CustomerBonsai/${bonsaiId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listCustomerBonsais: {},
  pagination: {},
  customerBonsaiDetail: {},
  loading: false,
  msg: {},
  token: null,
};

const customerBonsaiSlice = createSlice({
  name: "customerBonsai",
  initialState,
  reducers: {
    setAllCustomerBonsais: (state, action) => {
      state.listCustomerBonsais = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCustomerBonsaisByGardenId.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });

    builder.addCase(
      fetchCustomerBonsaisByGardenId.fulfilled,
      (state, action) => {
        state.listCustomerBonsais = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.loading = false;
      }
    );
    builder.addCase(fetchCustomerBonsaisByGardenId.rejected, (state) => {
      toast.error("Bạn không có quyền truy cập vào tính năng này!");
      state.loading = false;
    });
    builder
      .addCase(customerBonsaiDetail.pending, (state) => {
        state.msg = "Loading...";
        state.customerBonsaiDetail.loading = true;
      })
      .addCase(customerBonsaiDetail.fulfilled, (state, action) => {
        state.customerBonsaiDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.customerBonsaiDetail.loading = false;
      })
      .addCase(customerBonsaiDetail.rejected, (state) => {
        state.customerBonsaiDetail = {};
        state.msg = "Không tìm thấy";
        state.customerBonsaiDetail.loading = false;
      });
  },
});
const { reducer: customerBonsaiReducer, actions } = customerBonsaiSlice;
export const { setAllCustomerBonsais } = actions;
export { customerBonsaiReducer as default };
