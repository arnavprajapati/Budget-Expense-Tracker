import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: { type: Date, default: Date.now },
});

const BudgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    spent: { type: Number, default: 0 }, 
    expenses: [ExpenseSchema], 
});

export default mongoose.model('Budget', BudgetSchema);