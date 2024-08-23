import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "../slices/signupSlice";
import  instructorSignupSlice from "../slices/signupInstructorSlice";
import loginSlice from "../slices/loginSlice";
import userSlice from "../slices/userSlice";
const store = configureStore({
    reducer: {
        signup: signupSlice,
        signupInstructor: instructorSignupSlice,
        login: loginSlice,
        user: userSlice,
    }
})
export default store;