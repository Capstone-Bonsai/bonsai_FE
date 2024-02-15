import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const axiosCus = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});

export const register = createAsyncThunk(
  "customer/register",
  async (registerData, thunkAPI) => {
    try {
      const res = await axiosCus.post("/Auth/Register", registerData, {
        headers: "Access-Control-Allow-Origin",
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});
const { reducer: authReducer } = authSlice;

export { authReducer as default };
