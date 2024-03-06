import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarUrlRedux: null,
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatarUrlRedux(state, action) {
      state.avatarUrlRedux = action.payload;
      state.loading = false;
    },
  },
});

const { reducer: avatarReducer, actions } = avatarSlice;
export const { setAvatarUrlRedux } = actions;

export default avatarReducer;
