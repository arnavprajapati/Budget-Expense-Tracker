import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./slice/budgetSlice"; 
import authReducer from "./slice/authSlice"; 

const store = configureStore({
    reducer: {
        budgets: budgetSlice, 
        auth: authReducer, 
    },
});

export default store;