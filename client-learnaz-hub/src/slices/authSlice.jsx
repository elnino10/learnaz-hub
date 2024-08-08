import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//async to handle signup
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async(userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/signup-user`, userData);
            return response.data;
        }catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// async to handle login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/login-user`, { email, password });
        return response.data; // e.g., { token, user }
      } catch (error) {
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

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) =>{
            state.user = null;
            state.token = null;
        },
    },
    //handle signup action
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(signupUser.fulfilled, (state) =>{
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(signupUser.rejected, (state) => {
            state.status = 'failed';
            state.error = action.paylaod?.message || 'Failed to sighnup'
        })

        //handle login action
        .addCase(loginUser.pending, (state) => {
            state.status = 'Pending';
        })
        .addCase(loginUser.fulfilled, (state) => {
            state.status = 'Succeeded'
            state.user = action.paylaod.user;
            state.token = action.paylaod.token;
        })
        .addCase(loginUser.rejected, (state) => {
            state.status = 'Failed',
            state.error = action.payload?.message || 'Failed to login'
        });
    }
  });

export default authSlice.reducer;
export const  {logout} = authSlice.actions