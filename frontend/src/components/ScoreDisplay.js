import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ScoreDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const username = user.user.username;
    const { testUpload } = useContext(AuthContext);
    const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

    useEffect(() => {
        async function toBeCalled() {
            try {
                const response = await testUpload(username, score, totalQuestions);
                if (response === 1) {
                    console.log("Results uploaded successfully");
                }
            } catch (err) {
                console.log(err);
            }
        }

        toBeCalled();
    }, [score, totalQuestions, testUpload]);

    const handleRetakeTest = () => {
        navigate('/test');
    };

    const handleGoBack = () => {
        navigate('/dashboard'); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center transform transition-all hover:scale-105">
                <h2 className="text-4xl font-extrabold mb-8 text-gray-900">Your Score</h2>
                <p className="text-2xl font-medium text-gray-800 mb-6">
                    You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold text-blue-600">{totalQuestions}</span> questions.
                </p>
                <div className="space-y-6">
                    <button
                        onClick={handleRetakeTest}
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white mr-6 py-3 px-8 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Retake Test
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-8 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScoreDisplay;
