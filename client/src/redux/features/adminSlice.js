import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: false,
};

export const adminSlice = createSlice({
    name: "ad",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
    },
});

export const { setAdmin } = adminSlice.actions;

export const selectAdmin = (state) => state.admin.isAdmin;

// export default adminSlice.reducer;
