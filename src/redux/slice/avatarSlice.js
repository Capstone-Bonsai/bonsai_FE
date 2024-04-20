import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarUrlRedux: null,
  fullName: "",
  loading: false,
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatarUrlRedux(state, action) {
      state.avatarUrlRedux = action.payload;
      state.loading = false;
    },
    setFullNameRedux(state, action) {
      state.fullName = action.payload;
      state.loading = false;
    },
    startLoading(state) {
      state.loading = true;
    },
  },
});

const { reducer: avatarReducer, actions } = avatarSlice;
export const { setAvatarUrlRedux, setFullNameRedux, startLoading } = actions;

export default avatarReducer;
