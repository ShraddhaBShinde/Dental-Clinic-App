// userActions.js

// Action Types
const LOGOUT = 'LOGOUT';

// Action Creators
export const logout = () => ({
    type: LOGOUT,
});

// Reducer
const initialState = {
    // Initial state of the user
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                user: null, // Reset the user state to null on logout
            };
        default:
            return state;
    }
};

export default userReducer;
