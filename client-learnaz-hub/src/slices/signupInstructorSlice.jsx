import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//async to handle signup
export const signupInstructor = createAsyncThunk(
  "instructorSignup/signupInstructor",
  //rejectWithValue allows return of custom error payload
  async (instructorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/signup-user`,
        instructorData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const instructorSignupSlice = createSlice({
  name: "instructorSignup",
  initialState,
  //handle signup action
  extraReducers: (builder) => {
    builder
      .addCase(signupInstructor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupInstructor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupInstructor.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || "Signup failed. Please try again.";
      });
  },
});

export default instructorSignupSlice.reducer;
