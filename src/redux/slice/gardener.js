import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
export const freeGardener = createAsyncThunk(
  "garden/freeGardener",
  async ({ pageIndex, pageSize, contractId }) => {
    try {
      const response = await axios.get(
        `/User/FreeGardener?pageIndex=${pageIndex}&pageSize=${pageSize}&contractId=${contractId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addGardener = async (payload) => {
  try {
    const response = await axios.post(`/ServiceOrderGardener`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const initialState = {
  freeGardenerDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const gardenerSlice = createSlice({
  name: "gardener",
  initialState,
  reducers: {
    setGarden: (state, action) => {
      state.gardenDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(freeGardener.pending, (state) => {
        state.msg = "Loading...";
        state.freeGardenerDTO.loading = true;
      })
      .addCase(freeGardener.fulfilled, (state, action) => {
        state.freeGardenerDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.freeGardenerDTO.loading = false;
      })
      .addCase(freeGardener.rejected, (state) => {
        state.freeGardenerDTO = [];
        state.msg = "Không tìm thấy";
        state.freeGardenerDTO.loading = false;
      });
  },
});

const { reducer: gardenerReducer, actions } = gardenerSlice;
export const { setGarden } = actions;
export { gardenerReducer as default };
