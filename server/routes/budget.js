import express from 'express';
import auth from '../middleware/auth.js';
import Budget from '../models/Budget.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const { name, amount } = req.body;

        const newBudget = new Budget({
            user: req.user.id,
            name,
            amount,
        });

        const budget = await newBudget.save();
        res.json(budget);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id }).sort({ date: -1 });
        res.json(budgets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/:budgetId/expense', auth, async (req, res) => {
    try {
        const { budgetId } = req.params;
        const { name, amount } = req.body;

        const budget = await Budget.findOne({ _id: budgetId, user: req.user.id });

        if (!budget) return res.status(404).json({ msg: 'Budget not found' });

        const expenseAmount = parseFloat(amount);

        budget.expenses.push({ name, amount: expenseAmount });

        budget.spent = parseFloat((budget.spent + expenseAmount).toFixed(2));

        await budget.save();

        res.json(budget);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during Add Expense');
    }
});


router.delete('/:budgetId/expense/:expenseId', auth, async (req, res) => {
    try {
        const { budgetId, expenseId } = req.params;

        const budget = await Budget.findOne({ _id: budgetId, user: req.user.id });

        if (!budget) return res.status(404).json({ msg: 'Budget not found' });

        const expenseIndex = budget.expenses.findIndex(exp => exp._id.toString() === expenseId);

        if (expenseIndex === -1) {
            return res.status(404).json({ msg: 'Expense not found in budget' });
        }

        const deletedAmount = budget.expenses[expenseIndex].amount;

        budget.expenses.splice(expenseIndex, 1);

        budget.spent = parseFloat((budget.spent - deletedAmount).toFixed(2));

        await budget.save();
        res.json({ msg: 'Expense deleted successfully', budget });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during Delete Expense');
    }
});


router.delete('/:budgetId', auth, async (req, res) => {
    try {
        const { budgetId } = req.params;

        const budget = await Budget.findOneAndDelete({ _id: budgetId, user: req.user.id });

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found or user unauthorized' });
        }

        res.json({ msg: 'Budget deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during Delete Budget');
    }
});

export default router;