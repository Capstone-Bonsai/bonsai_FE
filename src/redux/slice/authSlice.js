import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosCus = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});

export const register = async (registerData) => {
  try {
    const res = await axiosCus.post("/Auth/Register", registerData, {
      headers: "Access-Control-Allow-Origin",
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosCus.post("/Auth/Login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const response = await axiosCus.post(`/Auth/ForgotPassword?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authSlice = createSlice({
  name: "auth",
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});
const { reducer: authReducer } = authSlice;

export { authReducer as default };
