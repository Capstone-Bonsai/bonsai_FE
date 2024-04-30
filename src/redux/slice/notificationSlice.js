import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allNotification = createAsyncThunk(
  "notification/allNotification",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/Notification/Pagination/?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const seenNotfi = createAsyncThunk(
  "notification/seenNotfi",
  async (notiId) => {
    try {
      const response = await axios.get(`/Notification/${notiId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  allNotificationDTO: {},
  notiDetail: {},
  loading: false,
  msg: "",
  token: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.allNotificationDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allNotification.pending, (state) => {
        state.msg = "Loading...";
        state.allNotificationDTO.loading = true;
      })
      .addCase(allNotification.fulfilled, (state, action) => {
        state.allNotificationDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.allNotificationDTO.loading = false;
      })
      .addCase(allNotification.rejected, (state) => {
        state.msg = "Error loading data";
        state.allNotificationDTO.loading = false;
      })
      .addCase(seenNotfi.pending, (state) => {
        state.notiDetail.msg = "Loading...";
        state.notiDetail.loading = true;
      })

      .addCase(seenNotfi.fulfilled, (state, action) => {
        state.notiDetail = action.payload;
        state.notiDetail.msg = "Data loaded successfully";
        state.notiDetail.loading = false;
      })
      .addCase(seenNotfi.rejected, (state) => {
        state.notiDetail = {};
        state.notiDetail.msg = "Error loading data";
        state.notiDetail.loading = false;
      });
  },
});
const { reducer: notificationReducer, actions } = notificationSlice;
export const { setNotification } = actions;
export { notificationReducer as default };
