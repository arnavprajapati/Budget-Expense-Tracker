import axios from 'axios';
import authService from './authService';

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? "https://budget-expense-tracker-r2jk.onrender.com/api"
        : "http://localhost:5000/api";

const API_URL = `${BASE_URL}/budgets/`;
const STATEMENT_API_URL = `${BASE_URL}/statements/`;

const getConfig = () => {
    const token = authService.getToken();
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
    };
};

const getFileConfig = () => {
    const token = authService.getToken();
    return {
        headers: {
            'x-auth-token': token,
        },
    };
};

const budgetService = {
    getBudgets: async () => {
        const response = await axios.get(API_URL, getConfig());
        return response.data;
    },

    createBudget: async (budgetData) => {
        const response = await axios.post(API_URL, budgetData, getConfig());
        return response.data;
    },

    deleteBudget: async (budgetId) => {
        await axios.delete(API_URL + budgetId, getConfig());
        return budgetId;
    },

    addExpense: async (budgetId, expenseData) => {
        const response = await axios.post(`${API_URL}${budgetId}/expense`, expenseData, getConfig());
        return response.data;
    },

    deleteExpense: async (budgetId, expenseId) => {
        await axios.delete(`${API_URL}${budgetId}/expense/${expenseId}`, getConfig());
        return { budgetId, expenseId };
    },

    uploadStatement: async (file) => {
        const formData = new FormData();
        formData.append('statementFile', file);

        const response = await axios.post(
            STATEMENT_API_URL + 'upload',
            formData,
            getFileConfig()
        );
        return response.data.transactions;
    },

    bulkAddExpenses: async (transactions) => {
        const response = await axios.post(API_URL + 'bulk-expense', transactions, getConfig());
        return response.data;
    }
};

export default budgetService;