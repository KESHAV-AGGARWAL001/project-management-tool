import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/globalRateLimiter";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        userCredentials,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.message ;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials) => {
    try {
      const response = await axiosInstance.post(
        "/user/register",
        userCredentials
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Add action here
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Add action here
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        // Add action here
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // Add action here
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
