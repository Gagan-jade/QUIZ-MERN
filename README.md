# Quiz Platform

A full-stack general knowledge trivia quiz application that provides users with an engaging quiz experience. The application features user authentication, quiz history tracking, and score summaries, with questions fetched from an external API.

## Features
- User authentication with secure login and registration
- General knowledge trivia questions fetched from an API
- Personalized dashboard displaying quiz history and scores
- Built with React, Node.js, Express, MongoDB, and Tailwind CSS

## Tech Stack
**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Authentication:** bcryptjs, JWT

## Installation

### Prerequisites
- Node.js and npm installed on your system
- MongoDB set up and running

### Backend Setup
Navigate to the `backend` folder, install dependencies with `npm install`, create a `.env` file with `MONGO_URI=your_mongodb_connection_string` and `JWT_SECRET=your_jwt_secret`, and run the server with `node server.js`.

### Frontend Setup
Navigate to the `frontend` folder, install dependencies with `npm install`, and start the React app with `npm start`.

### Running the Application
Ensure the backend server is running, start the frontend application, and access the application in your browser at `http://localhost:8080`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

