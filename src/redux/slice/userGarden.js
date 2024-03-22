import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchCustomerGarden = createAsyncThunk(
  "bonsai/fetchCustomerGarden",
  async () => {
    try {
      const response = await axios.get(`/CustomerGarden/Customer`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addCustomerGarden = async (formData) => {
  try {
    const response = await axios.post(`/CustomerGarden`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addBonsaiIntoGarden = async (formData, gardenId) => {
  try {
    const response = await axios.post(`/CustomerBonsai/Customer/${gardenId}`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const initialState = {
  gardenDTO: {},
  loading: false,
  msg: "",
  token: null,
};

const gardenSlice = createSlice({
  name: "garden",
  initialState,
  reducers: {
    setGarden: (state, action) => {
      state.gardenDTO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerGarden.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(fetchCustomerGarden.fulfilled, (state, action) => {
        state.gardenDTO = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(fetchCustomerGarden.rejected, (state) => {
        state.gardenDTO = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      });
  },
});

const { reducer: gardenReducer, actions } = gardenSlice;
export const { setGarden } = actions;
export { gardenReducer as default };
