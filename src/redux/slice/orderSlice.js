import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../utils/axiosCustomize";
import { toast } from "react-toastify";

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ pageIndex , pageSize }) => {
    try {
      const response = await axios.get(
        `/Order?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (productId) => {
    try {
      const response = await axios.get(`/Order/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listOrder: {},
  orderById: {},
  pagination: {},
  loading: false,
  msg: {},
  token: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAllOrders: (state, action) => {
      state.listOrder = action.payload;
    },
    setOrderById: (state, action) => {
      state.orderById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });

    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.listOrder = action.payload;
      state.pagination = {
        current: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize,
        total: action.payload.totalItemsCount,
      };
      //console.log(listUser);
      state.loading = false;
    });
    builder.addCase(fetchAllOrders.rejected, (state) => {
      toast.error("Bạn không có quyền truy cập vào tính năng này!");
      state.loading = false;
    });
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.orderById = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrderById.rejected, (state) => {
      state.loading = false;
    });
  },
});
const { reducer: orderReducer, actions } = orderSlice;
export const { setAllOrders, setOrderById } = actions;
export { orderReducer as default };
