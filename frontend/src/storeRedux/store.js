import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice.js";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
