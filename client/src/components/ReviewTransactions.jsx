import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, CheckCircle, Save, Trash2, Loader2 } from 'lucide-react';
import { clearParsedTransactions, addExpenseToBudget, fetchBudgets } from '../store/slice/budgetSlice';
import formatCurrency from '../utils/formatCurrency';

function ReviewTransactions({ transactions }) {
    const dispatch = useDispatch();
    const budgets = useSelector(state => state.budgets.list);

    const [reviewList, setReviewList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const initialList = transactions.map((tx, index) => ({
            ...tx,
            selectedBudgetId: budgets.find(b => b.name.toLowerCase() === tx.category.toLowerCase())?._id || '',
            isIgnored: tx.amount < 0 || tx.category.toLowerCase() === 'income' || tx.category.toLowerCase() === 'transfers',
            localId: index
        }));
        setReviewList(initialList);
    }, [transactions, budgets]);

    const handleIgnoreToggle = (localId) => {
        setReviewList(prev => prev.map((tx) =>
            tx.localId === localId ? { ...tx, isIgnored: !tx.isIgnored } : tx
        ));
    };

    const handleBudgetChange = (localId, budgetId) => {
        setReviewList(prev => prev.map((tx) =>
            tx.localId === localId ? { ...tx, selectedBudgetId: budgetId } : tx
        ));
    };

    const handleImportAll = async () => {
        const expensesToSave = reviewList.filter(tx =>
            !tx.isIgnored && tx.amount > 0 && tx.selectedBudgetId
        );

        if (expensesToSave.length === 0) {
            alert("Please select at least one valid expense and assign it to a budget.");
            return;
        }

        setIsSaving(true);

        const savePromises = expensesToSave.map(tx => {
            return dispatch(addExpenseToBudget({
                budgetId: tx.selectedBudgetId,
                expenseName: tx.name,
                expenseAmount: tx.amount,
            }));
        });

        await Promise.all(savePromises);

        dispatch(clearParsedTransactions());
        dispatch(fetchBudgets());
        setIsSaving(false);
    };

    const validBudgets = budgets.filter(b => b.amount >= b.spent);
    const expensesToReviewCount = reviewList.filter(tx => !tx.isIgnored && tx.amount > 0).length;

    return (
        <div className="mt-12">
            <h3 className="text-3xl font-bold text-[#387ED1] mb-6 flex items-center justify-between">
                <span className="font-semibold">Review {transactions.length} Imported Transactions</span>
                <button
                    onClick={() => dispatch(clearParsedTransactions())}
                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 font-semibold text-sm flex items-center space-x-1 border border-gray-300 shadow-sm"
                >
                    <X className="w-5 h-5" />
                    <span className="font-semibold cursor-pointer">Cancel Review</span>
                </button>
            </h3>

            <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Category</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assign to Budget</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reviewList.map((tx) => (
                            <tr key={tx.localId} className={`${tx.isIgnored ? 'bg-gray-100 text-gray-500 opacity-60' : ''}`}>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold">{tx.date}</td>
                                <td className="px-6 py-3 text-sm font-semibold">{tx.name}</td>
                                <td className={`px-6 py-3 text-sm font-bold whitespace-nowrap text-right ${tx.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {formatCurrency(Math.abs(tx.amount))} {tx.amount > 0 ? '(Expense)' : '(Income)'}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold">{tx.category}</td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm">
                                    {tx.amount > 0 && !tx.isIgnored ? (
                                        <select
                                            value={tx.selectedBudgetId}
                                            onChange={(e) => handleBudgetChange(tx.localId, e.target.value)}
                                            className="block w-full py-1 px-2 border border-gray-300 cursor-pointer rounded-md shadow-sm focus:ring-[#387ED1] focus:border-[#387ED1] font-semibold"
                                        >
                                            <option value="" className="font-semibold">-- Select Budget --</option>
                                            {validBudgets.map(budget => (
                                                <option key={budget._id} value={budget._id} className="font-semibold">{budget.name} ({formatCurrency(budget.amount - budget.spent)} left)</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="text-gray-400 font-semibold">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-right text-sm">
                                    <button
                                        onClick={() => handleIgnoreToggle(tx.localId)}
                                        className={`font-semibold cursor-pointer transition duration-150 ${tx.isIgnored ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}`}
                                    >
                                        {tx.isIgnored ? <CheckCircle className="w-5 cursor-pointer h-5 mx-auto" title="Click to UN-Ignore" /> : <Trash2 className="w-5 h-5 mx-auto" title="Click to Ignore" />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-200">
                <p className="text-lg font-bold text-gray-800 font-semibold">
                    Ready to import: <span className="text-[#387ED1] font-semibold">{expensesToReviewCount}</span> expenses.
                </p>
                <button
                    onClick={handleImportAll}
                    disabled={expensesToReviewCount === 0 || isSaving}
                    className="px-8 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-200 disabled:bg-gray-400 flex items-center space-x-2 cursor-pointer"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin font-semibold" />
                            <span className="font-semibold">Importing...</span>
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            <span className="font-semibold cursor-pointer">Import All {expensesToReviewCount} Expenses</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ReviewTransactions;