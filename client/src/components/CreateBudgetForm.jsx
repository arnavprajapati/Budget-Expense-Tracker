import React from 'react';
import { Wallet } from 'lucide-react';

function CreateBudgetForm({ newBudgetName, setNewBudgetName, newBudgetAmount, setNewBudgetAmount, handleAddBudget, submitted }) {
    
    const isNameValid = newBudgetName.trim().length > 0;
    const isAmountValid = parseFloat(newBudgetAmount) > 0;
    
    return (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 mb-12 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Budget Name Input */}
                <div>
                    <label htmlFor="budgetName" className="block text-gray-700 text-sm font-semibold mb-1">Budget Name</label>
                    <input
                        type="text"
                        id="budgetName"
                        placeholder="What's your budget called?"
                        value={newBudgetName}
                        onChange={(e) => setNewBudgetName(e.target.value)}
                        className={`w-full font-semibold px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 
                            ${submitted && !isNameValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#387ED1] focus:ring-[#387ED1]'}
                        `}
                    />
                    {submitted && !isNameValid && (
                        <p className="text-red-500 text-xs mt-1">Please enter a budget name.</p>
                    )}
                </div>
                
                <div>
                    <label htmlFor="budgetAmount" className="block text-gray-700 text-sm font-semibold mb-1">Amount</label>
                    <input
                        type="number"
                        id="budgetAmount"
                        placeholder="How much is your budget?"
                        value={newBudgetAmount}
                        onChange={(e) => setNewBudgetAmount(e.target.value)}
                        className={`w-full font-semibold px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 
                            ${submitted && !isAmountValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#387ED1] focus:ring-[#387ED1]'}
                        `}
                    />
                    {submitted && !isAmountValid && (
                        <p className="text-red-500 text-xs mt-1">Please enter a positive budget amount.</p>
                    )}
                </div>
            </div>
            <button
                onClick={handleAddBudget}
                className="mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 transition duration-200 flex items-center space-x-2 cursor-pointer"
            >
                <span>Create budget</span>
                <Wallet className="w-5 h-5" />
            </button>
        </div>
    );
}

export default CreateBudgetForm;