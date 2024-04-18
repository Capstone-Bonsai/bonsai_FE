import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../utils/axiosCustomize";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ pageIndex, pageSize }) => {
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

export const fetchOrderUser = createAsyncThunk(
  "order/orderUser",
  async ({ pageIndex = 0, pageSize = 20 }) => {
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

export const fetchOrderDetail = createAsyncThunk(
  "order/orderDetail",
  async (orderId) => {
    try {
      const response = await axios.get(`/Order/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const destination = async (payload) => {
  try {
    const response = await axios.post(`/DeliveryFee/CalculateFee`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
  orderUser: {},
  orderDetailUser: {},
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
    setOrderUser: (state, action) => {
      state.orderUser = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDetailUser = action.payload;
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
    builder
      .addCase(fetchOrderUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderUser.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchOrderUser.fulfilled, (state, action) => {
        state.orderUser = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetail.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.orderDetailUser = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      });
  },
});
const { reducer: orderReducer, actions } = orderSlice;
export const { setAllOrders, setOrderById, setOrderUser, setOrderDetail } =
  actions;
export { orderReducer as default };
