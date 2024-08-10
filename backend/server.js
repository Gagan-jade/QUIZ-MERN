const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { verifyToken } = require('./middleware/authMiddleware');
const TestResult = require('./models/TestResult');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const testSchema = new mongoose.Schema({
    username : String,
    score : Number,
    totalQuestions : Number,
    date : Date
});

const User = mongoose.model('User', userSchema);
const Test = mongoose.model('Test',testSchema);

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username);
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ token: 'fake-jwt-token', user });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
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

app.post('/api/auth/save', async (req, res) => {
    const { username, score, totalQuestions } = req.body;
    const date = new Date(); 

    const newTest = new Test({ username, score, totalQuestions, date });

    try {
        await newTest.save();
        console.log('Test result:', newTest);
        res.json({ success: true, test: newTest });
    } catch (error) {
        console.error('Error saving test:', error.message);
        res.status(500).json({ success: false, message: 'Error registering test' });
    }
});


app.get('/api/results/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log(`Username received: ${username}`);
        
        // Query to find results by username
        const results = await Test.find({ username });

        console.log(`Results found: ${JSON.stringify(results)}`);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No results found for this user.' });
        }
        res.json(results);
    } catch (error) {
        console.error(`Error fetching results: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

