# iNoteBook - React Note Taking Application


## Overview

iNoteBook is a full-stack web application built with React.js for the frontend and Node.js/Express for the backend. It allows users to create, read, update, and delete notes in a secure environment. The application features user authentication, ensuring that users can only access and manage their own notes.

## Features

- **User Authentication**: Secure signup and login functionality
- **Create Notes**: Add new notes with title, description, and tags
- **Read Notes**: View all your saved notes in one place
- **Update Notes**: Edit existing notes as needed
- **Delete Notes**: Remove notes you no longer need
- **Search Functionality**: Find notes by title or content
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**:
  - React.js
  - React Router for navigation
  - Context API for state management
  - Bootstrap for styling
  - Fetch API for HTTP requests

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database
  - Mongoose ODM for data modeling
  - JWT for authentication
  - bcrypt.js for password hashing

## Project Structure

The project is organized into two main directories:

1. **src/** - Contains the React frontend application
   - Components
   - Context
   - CSS files
   - Utility functions

2. **backend/** - Contains the Node.js/Express backend application
   - API routes
   - Middleware
   - Database models
   - Authentication logic

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JiteshK1/iNoteBook-react-App.git
   cd iNoteBook-react-App
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inotebook
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Application

### Running the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   npm start
   ```
   The backend server will run on [http://localhost:5000](http://localhost:5000)

### Running the Frontend Application

1. In a new terminal, navigate to the project root:
   ```bash
   cd iNoteBook-react-App
   ```

2. Start the React application:
   ```bash
   npm start
   ```
   The application will run in development mode on [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/user` - Get user details (requires authentication)

### Notes

- `GET /api/notes` - Get all notes for the logged-in user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note

## Building for Production

To build the app for production, run:
   ```bash
   npm run build
   ```
   This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

The application can be deployed to various platforms:

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render

Make sure to set the appropriate environment variables on your deployment platform.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- Add rich text editing capabilities
- Implement note sharing functionality
- Add categories and better organization options
- Create a mobile application using React Native
- Implement real-time collaboration features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React.js](https://reactjs.org/) for the frontend library
- [Node.js](https://nodejs.org/) for the backend runtime
- [Express.js](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Bootstrap](https://getbootstrap.com/) for the CSS framework

