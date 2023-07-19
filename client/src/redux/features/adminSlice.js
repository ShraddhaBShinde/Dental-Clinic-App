import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAdmin: false, // Initialize isAdmin as a property of the state
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminStatus: (state, action) => {
            state.isAdmin = action.payload; // Update the isAdmin property directly
        },

    },
});

export const { setAdminStatus, setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
