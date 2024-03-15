import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const allStyle = createAsyncThunk("bonsai/style", async () => {
  try {
    const response = await axios.get("/Style");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  allStyleDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setStyle: (state, action) => {
      state.allStyleDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allStyle.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(allStyle.fulfilled, (state, action) => {
        state.allStyleDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(allStyle.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      });
  },
});
const { reducer: styleReducer, actions } = styleSlice;
export const {
  setStyle
} = actions;
export { styleReducer as default };