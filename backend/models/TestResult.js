const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required : true
    }
});

module.exports = mongoose.model('TestResult', testResultSchema);
