import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

  const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) =>{
            state.user = null;
            state.token = null;
        },
    },
     //handle login action
     extraReducers: (builder) => {
        builder
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
export default loginSlice.reducer;
export const  {logout} = loginSlice.actions