import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosCustomize";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const currentUrl = window.location.href;

export const register = async (registerData) => {
  try {
    const res = await axios.post("/Auth/Register", registerData, {
      headers: "Access-Control-Allow-Origin",
    });
    return res.data;
  } catch (err) {
    const errorMessage = err.response.data;
    const errorStatus = err.response.status;
    throw (errorMessage, errorStatus, err);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post("/Auth/Login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const response = await axios.post(`/Auth/ForgotPassword?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmEmail = async (userId, code) => {
  try {
    const response = await axios.get(
      `/Auth/ConfirmEmail?userId=${userId}&code=${code}`,
      {
        headers: {
          Referer: currentUrl,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const profileUser = async () => {
  try {
    const user = cookies.get("user");
    const token = user?.token;
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await axios.get("/User/Profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileUser = async (formData) => {
  try {
    const user = cookies.get("user");
    const token = user?.token;
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await axios.put("/User/Profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
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
