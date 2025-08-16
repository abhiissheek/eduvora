# MERN Authentication System

A complete MERN stack authentication system with JWT tokens, following the tutorial approach.

## Features

- User registration and login
- JWT token-based authentication
- Protected routes
- Password hashing with bcrypt
- Input validation
- Error handling
- React frontend with context API
- Express.js backend with MongoDB

## Backend Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── authController.js  # Authentication logic
├── middleware/
│   └── auth.js           # JWT middleware
├── models/
│   └── User.js           # User model
├── routes/
│   └── auth.js           # Authentication routes
├── config.js             # Environment configuration
├── package.json          # Dependencies
└── server.js             # Express server
```

## Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js      # Login component
│   │   ├── Register.js   # Registration component
│   │   ├── Dashboard.js  # Protected dashboard
│   │   └── ProtectedRoute.js # Route protection
│   ├── context/
│   │   └── AuthContext.js # Authentication context
│   ├── App.js            # Main app component
│   ├── index.js          # React entry point
│   └── index.css         # Styles with Tailwind
├── public/
│   └── index.html        # HTML template
├── package.json          # Dependencies
└── tailwind.config.js    # Tailwind configuration
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)
- `PUT /me` - Update user profile (protected)

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-auth
   JWT_SECRET=kJ8mN2pQ5rT9wX3zA6bE1fH4iL7oS0vY2cF5gK8nP1qU4xB7eM0jR3tW6zA9dG2h
   JWT_EXPIRES_IN=7d
   ```

4. Start MongoDB service

5. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

## Usage

1. Start MongoDB service
2. Run backend server on port 5000
3. Run frontend on port 3000
4. Register a new account or login
5. Access protected dashboard after authentication

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React, React Router, Axios, Tailwind CSS, React Toastify
- **Authentication**: JWT tokens with HTTP-only approach
- **Validation**: express-validator for backend validation
