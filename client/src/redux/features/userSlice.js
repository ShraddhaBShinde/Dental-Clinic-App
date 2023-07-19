import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     patientName: '',
//     patientEmail: '',
//     // other patient details
//     isEditing: false,
// };

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAdmin: false, // Add isAdmin property
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAdmin = action.payload.isAdmin; // Set the isAdmin property from the payload
        }
        // setPatientDetails: (state, action) => {
        //     const { name, email } = action.payload;
        //     state.patientName = name;
        //     state.patientEmail = email;
        // },
        // // startEditing: (state) => {
        // //     state.isEditing = true;
        // // },
        // // stopEditing: (state) => {
        // //     // state.isEditing = false;
        // // },
        // updatePatientDetails: (state, action) => {
        //     const { name, email } = action.payload;
        //     state.patientName = name;
        //     state.patientEmail = email;
        //     // state.isEditing = false;
        // },

    },
});

export const { setUser } = userSlice.actions;

// export default userSlice.reducer;