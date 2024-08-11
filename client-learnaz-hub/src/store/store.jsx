import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "../slices/signupSlice";
import  instructorSignupSlice from "../slices/signupInstructorSlice";
const store = configureStore({
    reducer: {
        signup: signupSlice,
        signupInstructor: instructorSignupSlice,
    }
})
export default store;