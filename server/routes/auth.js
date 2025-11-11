import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, password });
        await user.save();

        const token = generateToken(user._id, user.username);
        res.status(201).json({ token, username: user.username });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const token = generateToken(user._id, user.username);
        res.json({ token, username: user.username });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

export default router;