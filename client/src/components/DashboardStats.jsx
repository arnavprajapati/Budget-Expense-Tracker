import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

function DashboardStats({ totalRemainingBudget, totalBudgeted, totalExpenses, formatCurrency }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-semibold">Total Remaining Budget</h3>
                    <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRemainingBudget)}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-semibold">Total Budgeted</h3>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalBudgeted)}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-semibold">Total Expenses</h3>
                    <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
            </div>
        </div>
    );
}

export default DashboardStats;