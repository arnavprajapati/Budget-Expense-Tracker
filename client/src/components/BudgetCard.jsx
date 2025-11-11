import React from 'react';
import { Trash2, Eye } from 'lucide-react';

function BudgetCard({ budget, onDelete, onViewDetails, getProgressBarWidth, formatCurrency }) {
    return (
        <div className="bg-white border border-red-500 rounded-xl p-6 shadow-lg">
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

            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-4">
                <span className='font-semibold '>{formatCurrency(budget.spent)} spent</span>
                <span className='font-semibold'>{formatCurrency(budget.amount - budget.spent)} remaining</span>
            </div>

            <div className='flex items-center space-x-2 mt-4'>
                <button
                    onClick={onViewDetails} 
                    className="flex-1 px-4 py-2 cursor-pointer rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 flex items-center justify-center space-x-2"
                >
                    <Eye className="w-5 h-5" />
                    <span>View Details</span>
                </button>
                <button
                    onClick={() => onDelete(budget._id)} 
                    className="px-4 py-2 cursor-pointer rounded-lg font-semibold text-white bg-gray-500 hover:bg-gray-600 transition duration-200 flex items-center space-x-2"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default BudgetCard;