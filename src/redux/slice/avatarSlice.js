import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarUrlRedux: null,
  loading: false, 
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatarUrlRedux(state, action) {
      state.avatarUrlRedux = action.payload;
      state.loading = false; // Khi dữ liệu đã được tải xong, set loading về false
    },
    startLoading(state) {
      state.loading = true; // Khi bắt đầu tải dữ liệu, set loading về true
    },
  },
});

const { reducer: avatarReducer, actions } = avatarSlice;
export const { setAvatarUrlRedux, startLoading } = actions;

export default avatarReducer;
