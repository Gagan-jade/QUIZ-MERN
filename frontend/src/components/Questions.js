import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuestion } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';
import he from 'he';

const Test = () => {
    const { questionCount } = useQuestion();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitWarning, setSubmitWarning] = useState('');
    const [warned, setWarned] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`https://opentdb.com/api.php?amount=${questionCount}`);

                const formattedQuestions = response.data.results.map((q) => {
                    const allOptions = [...q.incorrect_answers, q.correct_answer];
                    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5).map(option => he.decode(option));
                    const correctIndex = shuffledOptions.indexOf(he.decode(q.correct_answer));

                    return {
                        question: he.decode(q.question),
                        options: shuffledOptions,
                        correct: correctIndex,
                    };
                });

                setQuestions(formattedQuestions);
                setSelectedOptions(new Array(formattedQuestions.length).fill(null));
                setAnswered(new Array(formattedQuestions.length).fill(false));
            } catch (err) {
                setError('Failed to fetch questions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [questionCount]);

    const handleAnswer = (index) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[currentQuestion] = index;
        setSelectedOptions(updatedOptions);

        const newAnswered = [...answered];
        newAnswered[currentQuestion] = true;
        setAnswered(newAnswered);

        if (currentQuestion + 1 < questions.length && !answered[currentQuestion + 1]) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleQuestionClick = (index) => {
        setCurrentQuestion(index);
    };

    const handleSubmit = async () => {
        if (!warned && answered.includes(false)) {
            setSubmitWarning('Are you sure you want to submit without answering all the questions? Unanswered questions will be considered as incorrect answers.');
            setWarned(true);
            return;
        }

        let newScore = 0;
        questions.forEach((question, index) => {
            if (selectedOptions[index] === question.correct) {
                newScore += 1;
            }
        });

        setScore(newScore);

        navigate('/score-display', { state: { score: newScore, totalQuestions: questions.length } });
    };

    const goBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-900 flex">
            <div className="w-1/4 bg-yellow-300 p-4 sticky top-0 h-screen">
                <h3 className="text-2xl font-bold mb-4 text-white">Questions</h3>
                <div className="space-y-2">
                    {questions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuestionClick(index)}
                            className={`w-full py-3 px-5 rounded-lg text-white ${selectedOptions[index] !== null ? 'bg-teal-500' : 'bg-amber-500'} ${currentQuestion === index ? 'border-4 border-red-600' : ''}`}
                        >
                            Q{index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-3/4 p-8">
                <div className="bg-white shadow-2xl rounded-lg p-8">
                    <h2 className="text-4xl font-bold mb-6 text-blue-800">Test</h2>

                    {loading ? (
                        <p className="text-gray-800 text-lg">Loading...</p>
                    ) : error ? (
                        <p className="text-red-700 text-lg">{error}</p>
                    ) : questions.length === 0 ? (
                        <p className="text-gray-800 text-lg">No questions available.</p>
                    ) : (
                        <div>
                            <p className="text-2xl font-medium text-gray-700 mb-4">
                                Question {currentQuestion + 1} of {questions.length}
                            </p>
                            <p className="text-xl font-semibold text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}></p>
                            <div className="space-y-4">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        className={`w-full py-3 px-5 rounded-lg text-white ${selectedOptions[currentQuestion] === index ? 'bg-blue-600 cursor-pointer' : 'bg-gray-600 hover:bg-gray-500 cursor-pointer'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {submitWarning && (
                                <p className="text-red-700 text-lg mt-4">{submitWarning}</p>
                            )}
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out mt-6"
                            >
                                Submit Test
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Test;
