const express = require('express');
const TestResult = require('../models/TestResult');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/results/save', verifyToken, async (req, res) => {
    const { score, totalQuestions } = req.body;
    const userId = req.user.id;

    try {
        let testResult = await TestResult.findOne({ userId });

        if (!testResult) {
            testResult = new TestResult({ userId, testResults: [] });
        }

        testResult.testResults.push({ score, totalQuestions });
        await testResult.save();

        res.status(200).json({ message: 'Results saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save results', error });
    }
});

module.exports = router;
