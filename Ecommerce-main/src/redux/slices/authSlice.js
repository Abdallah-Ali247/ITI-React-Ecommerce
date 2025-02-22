import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

const storedUser = JSON.parse(localStorage.getItem("user"));


// Async actions
export const registerUser = createAsyncThunk("auth/register", async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
});

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }) => {
  const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
  return response.data.length ? response.data[0] : null;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return null;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: storedUser || null, loading: false, error: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;  
export const { loginSuccess, logout } = authSlice.actions;
 
