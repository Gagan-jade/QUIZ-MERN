import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestion } from '../context/QuestionContext';

const Instructions = () => {
    const [localCount, setLocalCount] = React.useState('');
    const [error, setError] = React.useState('');
    const { setQuestionCount } = useQuestion();
    const navigate = useNavigate();

    const handleStartTest = () => {
        if (localCount < 10) {
            setError("Minimum 10 questions.");
        } else if (localCount > 20) {
            setError("Maximum 20 questions");
        } else {
            setError(''); 
            setQuestionCount(Number(localCount));
            navigate('/questions');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex items-center justify-center">
            <div className="bg-white shadow-red-50 rounded-lg p-10 max-w-lg w-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Instructions</h2>
                <p className="text-lg text-gray-700 mb-6">
                    During the test, your screen will be locked. You won't be able to exit or navigate away until you submit the test.
                    Ensure you are ready to begin as you won't be able to return once started ( just kidding, I couldn't get the browser permissions for this, please don't copy 😛).
                </p>
                <div className="mb-6">
                    <label htmlFor="questionCount" className="block text-lg font-semibold mb-2 text-gray-800">Number of Questions:</label>
                    <input
                        id="questionCount"
                        type="number"
                        value={localCount}
                        onChange={(e) => setLocalCount(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="1"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleStartTest}
                        className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        Start Test
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
