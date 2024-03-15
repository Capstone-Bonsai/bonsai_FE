import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
export const fetchStyle = createAsyncThunk("bonsai/fetchStyle", async () => {
  try {
    const response = await axios.get(`/Style`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  styleDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setStyle: (state, action) => {
      state.styleDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStyle.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchStyle.fulfilled, (state, action) => {
        state.styleDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchStyle.rejected, (state) => {
        state.styleDTO = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      });
  },
});

const { reducer: styleReducer, actions } = styleSlice;
export const { setStyle } = actions;
export { styleReducer as default };
