import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBudget, deleteBudget } from '../store/slice/budgetSlice'; 
import formatCurrency from '../utils/formatCurrency'; 

import DashboardStats from './DashboardStats';
import CreateBudgetForm from './CreateBudgetForm';
import BudgetCard from './BudgetCard';
import BudgetDetails from './BudgetDetails';

import StatementUpload from './StatementUpload.jsx';
import ReviewTransactions from './ReviewTransactions.jsx';

const getProgressBarWidth = (budget) => {
    if (budget.amount === 0) return 0;
    const width = (budget.spent / budget.amount) * 100;
    return Math.min(width, 100);
};

function Dashboard({ userName, handleLogout }) {
    const dispatch = useDispatch();
    const budgets = useSelector((state) => state.budgets.list);
    
    const parsedTransactions = useSelector((state) => state.budgets.parsedTransactions);
    const parsingStatus = useSelector((state) => state.budgets.parsingStatus);

    const [viewingBudget, setViewingBudget] = useState(null);
    const [newBudgetName, setNewBudgetName] = useState('');
    const [newBudgetAmount, setNewBudgetAmount] = useState('');
    const [submitted, setSubmitted] = useState(false); 

    const totalBudgeted = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    const totalExpenses = budgets.reduce((acc, budget) => acc + budget.spent, 0);
    const totalRemainingBudget = totalBudgeted - totalExpenses;

    const handleAddBudget = () => {
        setSubmitted(true);
        const isNameValid = newBudgetName.trim().length > 0;
        const isAmountValid = parseFloat(newBudgetAmount) > 0;

        if (isNameValid && isAmountValid) {
            dispatch(addBudget({ name: newBudgetName.trim(), amount: parseFloat(newBudgetAmount) }));
            setNewBudgetName('');
            setNewBudgetAmount('');
            setSubmitted(false);
        }
    };

    const handleDeleteBudget = (budgetId) => {
        const budgetToDelete = budgets.find(b => b._id === budgetId); 
        if (window.confirm(`Are you sure you want to delete the budget "${budgetToDelete?.name || 'this'}" and all its expenses?`)) {
            dispatch(deleteBudget(budgetId));
            setViewingBudget(null); 
        }
    };
    
    useEffect(() => {
        if (viewingBudget) {
            const updatedBudget = budgets.find(b => b._id === viewingBudget._id);
            if (updatedBudget) {
                setViewingBudget(updatedBudget);
            }
        }
    }, [budgets]);


    let content;

    if (parsedTransactions.length > 0 && parsingStatus === 'succeeded') {
        content = (
            <ReviewTransactions transactions={parsedTransactions} /> 
        );
    } else if (viewingBudget) {
        content = (
            <BudgetDetails
                budget={viewingBudget}
                setViewingBudget={setViewingBudget}
                handleDeleteBudget={handleDeleteBudget}
                formatCurrency={formatCurrency}
                getProgressBarWidth={getProgressBarWidth}
            />
        );
    } else {
        content = (
            <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <StatementUpload /> 

                    <CreateBudgetForm
                        newBudgetName={newBudgetName}
                        setNewBudgetName={setNewBudgetName}
                        newBudgetAmount={newBudgetAmount}
                        setNewBudgetAmount={setNewBudgetAmount}
                        handleAddBudget={handleAddBudget}
                        submitted={submitted}
                    />

                </div>

                <div className="">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 font-semibold">Existing Budgets</h3>
                    {budgets.length === 0 ? (
                        <div className="bg-white border border-gray-300 rounded-xl p-8 text-center shadow-inner">
                            <p className="text-gray-500 font-semibold">No budgets yet. Create your first budget above!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 font-semibold lg:grid-cols-3 gap-6">
                            {budgets.map((budget) => (
                                <BudgetCard
                                    key={budget._id} 
                                    budget={budget}
                                    onDelete={handleDeleteBudget}
                                    onViewDetails={() => setViewingBudget(budget)}
                                    getProgressBarWidth={getProgressBarWidth}
                                    formatCurrency={formatCurrency}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen pt-20 relative">
            
            <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
                
                <h2 className="text-4xl font-bold text-gray-800 mb-8 font-semibold">
                    Welcome back, <span className="text-[#387ED1]">{userName}</span><span> !</span>
                </h2>

                <DashboardStats
                    totalRemainingBudget={totalRemainingBudget}
                    totalBudgeted={totalBudgeted}
                    totalExpenses={totalExpenses}
                    formatCurrency={formatCurrency}
                />
                
                {content}

            </div>

            <div className="absolute left-0 right-0 -bottom-50 z-0 pointer-events-none">
                <svg viewBox="0 0 1440 420" className="w-full">
                    <path fill={'#387ED1'} d="M0,250L48,266C96,282,192,314,288,314C384,314,480,282,576,276.7C672,271,768,293,864,298C960,303,1056,293,1152,282C1248,271,1344,261,1392,256.3L1440,250L1440,420L1392,420C1344,420,1248,420,1152,420C1056,420,960,420,864,420C768,420,672,420,576,420C480,420,384,420,288,420C192,420,96,420,48,420L0,420Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default Dashboard;