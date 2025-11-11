import axios from 'axios';
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/budgets/";

const config = () => {
    const token = authService.getToken();
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
    };
};

const budgetService = {
    getBudgets: async () => {
        const response = await axios.get(API_URL, config());
        return response.data;
    },

    createBudget: async (budgetData) => {
        const response = await axios.post(API_URL, budgetData, config());
        return response.data;
    },
    
    deleteBudget: async (budgetId) => {
        await axios.delete(API_URL + budgetId, config());
        return budgetId;
    },

    addExpense: async (budgetId, expenseData) => {
        const response = await axios.post(`${API_URL}${budgetId}/expense`, expenseData, config());
        return response.data;
    },
    
    deleteBudget: async (budgetId) => {
        await axios.delete(API_URL + budgetId, config()); 
        return budgetId;
    },

    deleteExpense: async (budgetId, expenseId) => {
        await axios.delete(`${API_URL}${budgetId}/expense/${expenseId}`, config());
        return { budgetId, expenseId };
    },
};

export default budgetService;