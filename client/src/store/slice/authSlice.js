import { createSlice } from "@reduxjs/toolkit";
import authService from '../../services/authService';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: authService.getToken(),
        user: localStorage.getItem('userName') || null,
        status: 'idle', 
        error: null,
    },
    reducers: {
        authLoading: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
            state.user = action.payload.username;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.token = null;
            state.user = null;
        },
        logout: (state) => {
            authService.logout(); 
            state.token = null;
            state.user = null;
            state.status = 'idle';
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    },
});

export const { authLoading, authSuccess, authFailure, logout, clearAuthError } = authSlice.actions;


export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(authLoading());
        const data = await authService.login(userData);
        dispatch(authSuccess(data));
    } catch (error) {
        const message = error.response?.data?.msg || "Login failed due to server error.";
        dispatch(authFailure(message));
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(authLoading());
        const data = await authService.register(userData);
        dispatch(authSuccess(data));
    } catch (error) {
        const message = error.response?.data?.msg || "Registration failed due to server error.";
        dispatch(authFailure(message));
    }
};

export default authSlice.reducer;