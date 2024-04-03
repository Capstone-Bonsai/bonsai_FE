import axios from "../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchCustomerGarden = createAsyncThunk(
  "bonsai/fetchCustomerGarden",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/CustomerGarden/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getGardenNoPagination = createAsyncThunk(
  "bonsai/gardenNoPagination",
  async () => {
    try {
      const response = await axios.get(`/CustomerGarden`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getBonsaiInGarden = createAsyncThunk(
  "bonsai/bonsaiDetailInGarden",
  async ({ bonsaiInGardenId }) => {
    try {
      const response = await axios.get(`/CustomerBonsai/${bonsaiInGardenId}`);
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

export const addBonsaiBuyFromStore = async (bonsaiId, customerGardenId) => {
  try {
    const response = await axios.post(`/CustomerBonsai/BoughtBonsai`, {
      bonsaiId,
      customerGardenId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBonsaiIntoGarden = async (formData, gardenId) => {
  try {
    const response = await axios.post(
      `/CustomerBonsai/Customer/${gardenId}`,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const initialState = {
  gardenDTO: {},
  gardenNoPagination: {},
  bonsaiInGarden: {},
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
      })
      .addCase(getGardenNoPagination.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(getGardenNoPagination.fulfilled, (state, action) => {
        state.gardenNoPagination = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(getGardenNoPagination.rejected, (state) => {
        state.gardenNoPagination = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(getBonsaiInGarden.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })

      .addCase(getBonsaiInGarden.fulfilled, (state, action) => {
        state.bonsaiInGarden = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(getBonsaiInGarden.rejected, (state) => {
        state.bonsaiInGarden = {};
        state.msg = "Không tìm thấy";
        state.loading = false;
      });
  },
});

const { reducer: gardenReducer, actions } = gardenSlice;
export const { setGarden } = actions;
export { gardenReducer as default };
