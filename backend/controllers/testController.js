const TestResult = require('../models/TestResult');
const User = require('../models/User');

const getResults = async (req, res) => {
    try {
        const results = await TestResult.find({ userId: req.userId });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const submitResult = async (req, res) => {
    const { score, totalQuestions } = req.body;  // Get totalQuestions from the request body

    try {
        const newResult = await TestResult.create({ userId: req.userId, score, totalQuestions });

        await User.findByIdAndUpdate(req.userId, { $push: { results: newResult._id } });

        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getResults, submitResult };
