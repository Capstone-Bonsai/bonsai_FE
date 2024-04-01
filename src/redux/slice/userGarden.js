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

export const fetchCustomerGardensManagers = createAsyncThunk(
  "garden/fetchCustomerGardensManagers",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/CustomerGarden/Manager/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
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

const initialState = {
  gardenDTO: {},
  gardenNoPagination: {},
  gardenManagerDTO: {},
  pagination: {},
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
    setGardensManager: (state, action) => {
      state.gardenManagerDTO = action.payload;
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
        state.getGardenNoPagination = [];
        state.msg = "Không tìm thấy";
        state.loading = false;
      });
    builder
      .addCase(fetchCustomerGardensManagers.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(fetchCustomerGardensManagers.fulfilled, (state, action) => {
        state.gardenManagerDTO = action.payload;
        state.pagination = {
          current: action.payload.pageIndex + 1,
          pageSize: action.payload.pageSize,
          total: action.payload.totalItemsCount,
        };
        state.loading = false;
      })
      .addCase(fetchCustomerGardensManagers.rejected, (state) => {
        toast.error("Bạn không có quyền truy cập vào tính năng này!");
        state.loading = false;
      });
  },
});

const { reducer: gardenReducer, actions } = gardenSlice;
export const { setGarden, setGardensManager } = actions;
export { gardenReducer as default };