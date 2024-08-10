const express = require('express');
const { getResults, submitResult } = require('../controllers/testController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getResults);
router.post('/submit', authMiddleware, submitResult);

module.exports = router;
