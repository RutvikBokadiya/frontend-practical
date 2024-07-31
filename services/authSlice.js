import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './api';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;

        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state,
            action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;

        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;