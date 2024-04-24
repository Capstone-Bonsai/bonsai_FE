import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../utils/axiosCustomize";
import { toast } from "react-toastify";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async ({ pageIndex = 0, pageSize = 20 }) => {
    try {
      const response = await axios.get(
        `/User?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (productId) => {
    try {
      const response = await axios.get(`/Product/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const notificationUser = createAsyncThunk(
  "bonsai/notification",
  async ({pageIndex, pageSize}) => {
    try {
      const response = await axios.get(
        `/Notification/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listUser: {},
  userById: {},
  notification: {},
  pagination: {},
  loading: false,
  msg: {},
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.listUser = action.payload;
    },
    setUserById: (state, action) => {
      state.userById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.listUser = action.payload;
      state.pagination = {
        current: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize,
        total: action.payload.totalItemsCount,
      };
      //console.log(listUser);
      state.loading = false;
    });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      toast.error("Bạn không có quyền truy cập vào tính năng này!");
      state.loading = false;
    });
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.userById = action.payload;
      state.loading = false;
    });
    builder
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(notificationUser.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(notificationUser.fulfilled, (state, action) => {
        state.notification = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(notificationUser.rejected, (state) => {
        state.notification = {};
        state.notification.msg = "Error loading data";
        state.notification.loading = false;
      });
  },
});
const { reducer: userReducer, actions } = userSlice;
export const { setAllUsers, setUserById } = actions;
export { userReducer as default };
