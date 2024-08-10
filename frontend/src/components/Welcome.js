import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS Files/Welcome.css'; 

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-6xl font-extrabold mb-12 text-white drop-shadow-lg">Quiz App</h1>
      <div className="space-x-6">
        <Link to="/login" className="button-wrapper">
          <svg className="button-svg" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="75%" y2="100%">
                <stop offset="0%" stopColor="#FF6F61">
                  <animate attributeName="stopColor" values="#FF6F61; #FF9A8B; #FF6F61" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#FF6F61">
                  <animate attributeName="stopColor" values="#FF9A8B; #FF6F61; #FF9A8B" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <rect className="button-rect" height="80" width="400" />
          </svg>
          <div className="button-text">Login</div>
        </Link>
        <Link to="/register" className="button-wrapper">
          <svg className="button-svg" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="75%" y2="100%">
                <stop offset="0%" stopColor="#6A1B9A">
                  <animate attributeName="stopColor" values="#6A1B9A; #AB47BC; #6A1B9A" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#6A1B9A">
                  <animate attributeName="stopColor" values="#AB47BC; #6A1B9A; #AB47BC" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <rect className="button-rect" height="80" width="400" />
          </svg>
          <div className="button-text">Register</div>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
