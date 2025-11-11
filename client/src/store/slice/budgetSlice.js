import { createSlice } from '@reduxjs/toolkit';
import budgetService from '../../services/budgetService';

export const budgetsLoading = () => ({ type: 'budgets/budgetsLoading' });
export const budgetsSuccess = (data) => ({ type: 'budgets/budgetsSuccess', payload: data });
export const budgetsFailure = (message) => ({ type: 'budgets/budgetsFailure', payload: message });



export const fetchBudgets = () => async (dispatch) => {
    try {
        dispatch(budgetsLoading());
        const data = await budgetService.getBudgets();
        dispatch(budgetsSuccess(data));
    } catch (error) {
        const message = error.response?.data?.msg || "Failed to fetch budgets from server.";
        dispatch(budgetsFailure(message));
    }
};

export const addBudget = (budgetData) => async (dispatch) => {
    try {
        await budgetService.createBudget(budgetData);
        dispatch(fetchBudgets()); 
    } catch (error) {
        console.error("Add Budget API Error:", error.response?.data || error.message);
    }
};

export const deleteBudget = (budgetId) => async (dispatch) => {
    try {
        await budgetService.deleteBudget(budgetId);
        dispatch(fetchBudgets()); 
    } catch (error) {
        console.error("Delete Budget API Error:", error.response?.data || error.message);
    }
};

export const addExpenseToBudget = ({ budgetId, expenseName, expenseAmount }) => async (dispatch) => {
    try {
        const expenseData = { 
            name: expenseName, 
            amount: parseFloat(expenseAmount) 
        };
        await budgetService.addExpense(budgetId, expenseData);
        dispatch(fetchBudgets()); 
    } catch (error) {
        console.error("Add Expense API Error:", error.response?.data || error.message);
    }
};

export const deleteExpense = ({ budgetId, expenseId }) => async (dispatch) => {
    try {
        await budgetService.deleteExpense(budgetId, expenseId);
        dispatch(fetchBudgets()); 
    } catch (error) {
        console.error("Delete Expense API Error:", error.response?.data || error.message);
    }
};


const budgetSlice = createSlice({
    name: 'budgets',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        budgetsLoading: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        budgetsSuccess: (state, action) => {
            state.status = 'succeeded';
            state.list = action.payload;
            state.error = null;
            if (localStorage.getItem('budgets')) {
                localStorage.removeItem('budgets');
            }
        },
        budgetsFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.list = [];
        },
        loadBudgets: (state, action) => { 
            state.list = action.payload;
        },
    },
});

export const { loadBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;