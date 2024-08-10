import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const username = user.username;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalScore, setTotalScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [iqScore, setIqScore] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/results/${username}`);
                setResults(data);
            } catch (err) {
                setError('No previous records');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [username]);

    useEffect(() => {

        const calculateTotals = () => {
            const scoreSum = results.reduce((acc, result) => acc + result.score, 0);
            const questionsSum = results.reduce((acc, result) => acc + result.totalQuestions, 0);
            setTotalScore(scoreSum);
            setTotalQuestions(questionsSum);


            if (questionsSum > 0) {
                const percentage = (scoreSum / questionsSum) * 100;
                const scaledIq = Math.round(100 + ((percentage - 50) * 1.5));
                setIqScore(scaledIq);
            } else {
                setIqScore(null);
            }
        };

        calculateTotals();
    }, [results]);

    return (
        <div className="min-h-screen flex">

            <div className="flex-1 p-8 bg-gradient-to-b from-black via-black to-green-400">
 
                <header className="bg-gradient-to-t from-black to-green-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
                    <button 
                        onClick={logout} 
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>
                </header>

                <div className="container mx-auto bg-gradient-to-t from-green-400 to-black shadow-lg rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-green-600">Previous Results</h2>

                    {loading ? (
                        <p className="text-gray-600 text-lg">Loading...</p>
                    ) : error ? (
                        <p className="text-red-600 text-lg">No previous records</p>
                    ) : results.length === 0 ? (
                        <p className="text-gray-600 text-lg">You haven't taken any tests yet. Take up one!</p>
                    ) : (
                        <ul className="space-y-4">
                            {results.map((result) => (
                                <li key={result._id} className="bg-gradient-to-r from-green-400 to-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <div className="text-lg font-medium text-gray-900">Score: <span className="text-green-600">{result.score}/{result.totalQuestions}</span></div>
                                    <div className="text-gray-700">Date: {new Date(result.date).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
                                </li>
                            ))}
                        </ul>
                    )}


                    {location.state?.score !== undefined && (
                        <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-green-700">Your latest test score: {location.state.score}</p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-lg font-semibold mb-4 text-white">Feeling ready for a new challenge?</p>
                        <button 
                            onClick={() => navigate('/test')} 
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out"
                        >
                            Take a Test
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-64 bg-gradient-to-r from-green-500 to-black shadow-lg p-6">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Your Stats</h3>
                        <p className="text-lg font-medium text-white">Total Score: <span className="text-green-600">{totalScore}</span></p>
                        <p className="text-lg font-medium text-white">Total Questions: <span className="text-green-600">{totalQuestions}</span></p>
                        {iqScore !== null && (
                            <p className="text-lg font-medium text-white">Estimated Average Score: <span className="text-green-600">{iqScore}</span></p>
                        )}
                    </div>
                    <footer className="text-white mt-4">
                        <p className="text-sm">&copy; 2024 Made by Gagan. Thank you.</p>
                    </footer>
                </div>
                
            </div>
            
        </div>
    );
};

export default Dashboard;
