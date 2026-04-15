# PRIVA-SYNC-PROJECT

PRIVA-SYNC-PROJECT is a full-stack web application that combines user authentication with a chatbot interface. The project focuses on secure access, ensuring that only authenticated users can interact with the chatbot.

# Project Overview

The project is built in two main phases:

# 1. Backend Development
We started by setting up the backend using Node.js and Express.js. The core focus was on authentication and database integration.

- Created authentication APIs:
  - Register
  - Login
  - Logout
- Connected the server to MongoDB
- Designed a User Schema to store:
  - Username
  - Email
  - Password
- Built REST APIs using Express
- Tested all APIs using Postman
- Implemented JWT (JSON Web Token) authentication
- Added middleware to protect routes and verify users

At this stage, the backend was fully functional and secure.



# 2. Frontend Development
For the frontend, we used React to build an interactive and user-friendly interface.

- Developed a chatbot UI and refined it multiple times
- Built Login and Register pages
- Connected frontend to backend using Axios
- Implemented authentication flow:
  - Store token after login
  - Restrict chatbot access to only logged-in users



# Key Features

- User Registration & Login System
- JWT-based Authentication
- Protected Routes using Middleware
- MongoDB Database Integration
- Chatbot Interface (Frontend)
- API Integration with Axios
- Clean and responsive UI



# Tech Stack

# Frontend:
- React
- CSS

# Backend:
- Node.js
- Express.js

# Database:
- MongoDB

# Tools & Libraries:
- Axios
- JWT (jsonwebtoken)
- Postman (for API testing)



# How It Works

1. A user registers or logs into the system.
2. Upon successful login, a JWT token is generated.
3. The token is stored on the client side.
4. Only authenticated users can send messages to the chatbot.
5. Middleware verifies the token before allowing access.



# Future Improvements

- Improve chatbot intelligence using AI models
- Add chat history storage
- Enhance UI/UX further
- Add profile management features



# Author

Developed by Rohit Kumar



