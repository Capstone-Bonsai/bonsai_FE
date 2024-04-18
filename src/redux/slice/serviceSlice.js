import axios from "./../../utils/axiosCustomize";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const fetchAllService = createAsyncThunk(
  "service/fetchAllService",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/Service?page=${pageIndex}&size=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const cancelServiceGarden = async (serviceGardenId) => {
  try {
    const response = await axios.put(
      `/ServiceGarden/cancellation/${serviceGardenId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const serviceOption = createAsyncThunk(
  "service/serviceOption",
  async () => {
    try {
      const response = await axios.get(`/ServiceType`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const acceptServiceGarden = async (serviceGardenId) => {
  try {
    const response = await axios.put(
      `/ServiceGarden/acception/${serviceGardenId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchServiceById = createAsyncThunk(
  "service/fetchServiceById",
  async (serviceId) => {
    try {
      const response = await axios.get(`/Service/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postServiceGarden = createAsyncThunk(
  "service/postService",
  async (payload) => {
    try {
      const response = await axios.post(`/ServiceGarden`, payload);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  }
);

export const allServiceType = createAsyncThunk(
  "service/allServiceType",
  async () => {
    try {
      const response = await axios.get("/Service/ServiveType");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const manageServiceCustomer = createAsyncThunk(
  "service/manageServiceCustomer",
  async ({ pageIndex, pageSize }) => {
    try {
      const response = await axios.get(
        `/ServiceGarden/Pagination?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listService: {},
  serviceById: {},
  serviceType: {},
  manageService: {},
  serviceOption: {},
  allServiceTypeDTO: undefined,
  serviceTempPrice: {},
  serviceTypeId: "",
  pagination: {},
  loading: false,
  msg: "",
  token: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceType: (state, action) => {
      state.allServiceTypeDTO = action.payload;
    },
    setAllService: (state, action) => {
      state.listService = action.payload;
    },
    setServiceById: (state, action) => {
      state.serviceById = action.payload;
    },
    setServiceTypeId: (state, action) => {
      state.serviceTypeId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllService.pending, (state) => {
      state.msg = "Loading...";
      state.listService.loading = true;
    });
    builder.addCase(fetchAllService.fulfilled, (state, action) => {
      state.listService.services = action.payload;
      state.pagination = {
        current: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize,
        total: action.payload.totalItemsCount,
      };
      state.listService.loading = false;
    });
    builder.addCase(fetchAllService.rejected, (state) => {
      toast.error("Bạn không có quyền truy cập vào tính năng này!");
      state.listService.loading = false;
    });
    builder.addCase(fetchServiceById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchServiceById.fulfilled, (state, action) => {
      state.serviceById = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchServiceById.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(allServiceType.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });
    builder.addCase(allServiceType.fulfilled, (state, action) => {
      state.allServiceTypeDTO = action.payload;
      state.msg = "Data loaded successfully";
      state.loading = false;
    });
    builder.addCase(allServiceType.rejected, (state) => {
      state.msg = "Error loading data";
      state.loading = false;
    });
    builder
      .addCase(postServiceGarden.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(postServiceGarden.fulfilled, (state, action) => {
        state.serviceTempPrice = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(postServiceGarden.rejected, (state) => {
        state.serviceTempPrice = {};
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(manageServiceCustomer.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(manageServiceCustomer.fulfilled, (state, action) => {
        state.manageService = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(manageServiceCustomer.rejected, (state) => {
        state.manageService = {};
        state.msg = "Không tìm thấy";
        state.loading = false;
      })
      .addCase(serviceOption.pending, (state) => {
        state.msg = "Loading...";
        state.loading = true;
      })
      .addCase(serviceOption.fulfilled, (state, action) => {
        state.serviceOption = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      })
      .addCase(serviceOption.rejected, (state) => {
        state.serviceOption = {};
        state.msg = "Không tìm thấy";
        state.loading = false;
      });
  },
});
const { reducer: serviceReducer, actions } = serviceSlice;
export const {
  setAllService,
  setServiceById,
  setServiceType,
  setServiceTypeId,
} = actions;
export { serviceReducer as default };
