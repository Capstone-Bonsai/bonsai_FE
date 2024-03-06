import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../utils/axiosCustomize";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const fetchAllTags = createAsyncThunk("tag/fetchAllTags", async () => {
  try {
    const response = await axios.get(`/Tag`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchTagsDetail = createAsyncThunk(
  "tag/tagDetail",
  async (tagId) => {
    try {
      const response = await axios.get(`/Tag/${tagId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  listTag: {},
  tagDetail: {},
  pagination: {},
  loading: false,
  msg: {},
  token: null,
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setAllTags: (state, action) => {
      state.listTag = action.payload;
    },
    setTagDetail: (state, action) => {
      state.tagDetail = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllTags.pending, (state) => {
      state.msg = "Loading...";
      state.loading = true;
    });

    builder.addCase(fetchAllTags.fulfilled, (state, action) => {
      state.listTag = action.payload;
      state.pagination = {
        current: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize,
        total: action.payload.totalItemsCount,
      };
      state.loading = false;
    });
    builder.addCase(fetchAllTags.rejected, (state) => {
      toast.error("Bạn không có quyền truy cập vào tính năng này!");
      state.loading = false;
    });
    builder
      .addCase(fetchTagsDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagsDetail.rejected, (state) => {
        state.msg = "Error loading data";
        state.loading = false;
      })
      .addCase(fetchTagsDetail.fulfilled, (state, action) => {
        state.tagDetail = action.payload;
        state.msg = "Data loaded successfully";
        state.loading = false;
      });
  },
});
const { reducer: tagReducer, actions } = tagSlice;
export const { setAllTags, setTagDetail } = actions;
export { tagReducer as default };
