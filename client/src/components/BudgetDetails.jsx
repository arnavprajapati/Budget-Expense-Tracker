import React from 'react';
import { Trash2 } from 'lucide-react';
import CreateExpenseForm from './CreateExpenseForm';
import ExpenseTable from './ExpenseTable';

function BudgetDetails({ budget, setViewingBudget, handleDeleteBudget, formatCurrency, getProgressBarWidth }) {
    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-red-600 mb-6">{budget.name} Overview</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

                <div className="bg-white border border-red-500 rounded-xl p-6 shadow-lg h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold text-red-600">{budget.name}</h4>
                        <span className="text-md font-semibold text-gray-700">{formatCurrency(budget.amount)} Budgeted</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            className={`h-2 rounded-full ${budget.spent > budget.amount ? 'bg-red-700' : 'bg-red-500'}`}
                            style={{ width: `${getProgressBarWidth(budget)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span className='font-semibold'>{formatCurrency(budget.spent)} spent</span>
                        <span className='font-semibold'>{formatCurrency(budget.amount - budget.spent)} remaining</span>
                    </div>

                    <div className='flex flex-col space-y-3 mt-8 pt-4 border-t border-gray-200'>
                        <button
                            onClick={() => setViewingBudget(null)} 
                            className="w-full px-6 py-2 cursor-pointer rounded-lg font-semibold text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-sm"
                        >
                            <span>← Back to All Budgets</span>
                        </button>
                        <button
                            onClick={() => handleDeleteBudget(budget._id)} 
                            className="w-full px-6 py-2 cursor-pointer rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-200 flex items-center justify-center space-x-2 shadow-md"
                        >
                            <Trash2 className="w-5 h-5" />
                            <span>Delete This Budget</span>
                        </button>
                    </div>
                </div>

                <CreateExpenseForm budgetId={budget._id} budgetName={budget.name} />
            </div>

            <div className="mt-12">
                <ExpenseTable budget={budget} formatCurrency={formatCurrency} />
            </div>
        </div>
    );
}

export default BudgetDetails;