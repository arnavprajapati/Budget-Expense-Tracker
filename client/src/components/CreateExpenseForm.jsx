import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { addExpenseToBudget } from '../store/slice/budgetSlice';

function CreateExpenseForm({ budgetId, budgetName }) {
    const dispatch = useDispatch();
    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [submitted, setSubmitted] = useState(false); 

    const isNameValid = newExpenseName.trim().length > 0;
    const isAmountValid = parseFloat(newExpenseAmount) > 0;

    const handleAddExpense = () => {
        setSubmitted(true);

        if (isNameValid && isAmountValid) {
            dispatch(addExpenseToBudget({
                budgetId,
                expenseName: newExpenseName.trim(),
                expenseAmount: parseFloat(newExpenseAmount),
            }));

            setNewExpenseName('');
            setNewExpenseAmount('');
            setSubmitted(false);
        }
    };
    return (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 shadow-sm h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New <span className="text-[#387ED1]">{budgetName}</span> Expense</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label htmlFor="expenseName" className="block text-gray-700 text-sm font-semibold mb-1">Expense Name</label>
                    <input
                        type="text"
                        id="expenseName"
                        placeholder="What did you spend on?"
                        value={newExpenseName}
                        onChange={(e) => setNewExpenseName(e.target.value)}
                        className={`w-full font-semibold px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 
                            ${submitted && !isNameValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#387ED1] focus:ring-[#387ED1]'}
                        `}
                    />
                    {submitted && !isNameValid && (
                        <p className="text-red-500 text-xs mt-1">Expense name is required.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="expenseAmount" className="block text-gray-700 text-sm font-semibold mb-1">Amount</label>
                    <input
                        type="number"
                        id="expenseAmount"
                        placeholder="How much did you spend?"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                        className={`w-full font-semibold px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 
                            ${submitted && !isAmountValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#387ED1] focus:ring-[#387ED1]'}
                        `}
                    />
                    {submitted && !isAmountValid && (
                        <p className="text-red-500 text-xs mt-1">Enter a positive amount.</p>
                    )}
                </div>
            </div>
            <button
                onClick={handleAddExpense}
                className="mt-4 px-6 py-3 cursor-pointer rounded-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 transition duration-200 flex items-center space-x-2"
            >
                <span>Add Expense</span>
                <PlusCircle className="w-5 h-5" />
            </button>
        </div>
    );
}

export default CreateExpenseForm;