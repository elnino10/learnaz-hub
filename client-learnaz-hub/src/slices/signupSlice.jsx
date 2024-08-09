import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//async to handle signup
export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async(userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/signup-user`, userData);
            return response.data;
        }catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);
  const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  }

  const signupSlice = createSlice({
    name: 'signup',
    initialState,
    //handle signup action
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(signupUser.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message || 'Signup failed. Please try again.'
        })

    }
  });

export default signupSlice.reducer;
