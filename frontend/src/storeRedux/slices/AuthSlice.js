import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      userCredentials,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials) => {
    const response = await axios.post(
      "http://localhost:3000/api/user/register",
      userCredentials
    );
    return response.data;
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
