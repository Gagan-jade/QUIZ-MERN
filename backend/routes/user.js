const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Login Route
router.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username);
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Register Route
router.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    try {
        await newUser.save();
        console.log('User saved:', newUser);
        res.json({ user: newUser });
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).send('Error registering user');
    }
});

module.exports = router;
