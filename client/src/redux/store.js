import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";
import adminSlice from "./features/adminSlice";


export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer,
        admin: adminSlice,
    }
})