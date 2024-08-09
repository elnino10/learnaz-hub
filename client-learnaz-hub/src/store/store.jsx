import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "../slices/signupSlice";
const store = configureStore({
    reducer: {
        signup: signupSlice
    }
})
export default store;