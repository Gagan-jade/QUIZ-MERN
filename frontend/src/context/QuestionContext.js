import React, { createContext, useState, useContext } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionCount, setQuestionCount] = useState(null);

    return (
        <QuestionContext.Provider value={{ questionCount, setQuestionCount }}>
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestion = () => useContext(QuestionContext);
