import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = `${baseUrl}/users`;

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (id, {rejectWithValue}) => {
        try{
            const response = await axios.get(`${apiUrl}/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
              });
              return response.data.data;
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
    }
);

const initialState = {
    authUser: null,
    userData: null,
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.authUser = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.userData = action.payload;
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        });
    }
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;