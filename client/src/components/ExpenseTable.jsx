import React from 'react';
import { useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { deleteExpense } from '../store/slice/budgetSlice';

function ExpenseTable({ budget, formatCurrency }) {
    const dispatch = useDispatch();

    const handleDeleteExpense = (expenseId) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            dispatch(deleteExpense({ budgetId: budget._id, expenseId }));
        }
    };

    return (
        <>
            <h3 className="text-2xl font-bold text-red-600 mb-6">{budget.name} Expenses</h3>
            {budget.expenses.length === 0 ? (
                <div className="bg-white border border-gray-300 rounded-xl p-8 text-center shadow-inner">
                    <p className="text-gray-500 font-semibold">No expenses recorded for this budget yet. Add one above!</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {budget.expenses.slice().reverse().map((expense) => (
                                <tr key={expense._id}> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        {expense.name}
                                    </td>
                                    <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-gray-700">
                                        {formatCurrency(expense.amount)}
                                    </td>
                                    <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-gray-700">
                                        {new Date(expense.date).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 font-semibold whitespace-nowrap text-right text-sm ">
                                        <button
                                            onClick={() => handleDeleteExpense(expense._id)} 
                                            className="text-red-600 hover:cursor-pointer"
                                        >
                                            <Trash2 className="w-5 h-5 mx-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default ExpenseTable;