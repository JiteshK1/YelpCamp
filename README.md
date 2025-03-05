# YelpCamp
## Overview

YelpCamp is a web application that allows users to discover, review, and share campgrounds. Inspired by Yelp, but focused exclusively on camping experiences, this platform enables campers to find the perfect spot for their next adventure. Users can create accounts, add new campgrounds, leave reviews, and interact with a community of outdoor enthusiasts.

The application features a responsive design, user authentication, authorization, interactive maps, image uploads, and a review system. It serves as a comprehensive resource for camping information across various locations.

## Features

- **User Authentication**: Secure signup and login functionality
- **Campground Management**: Create, read, update, and delete campgrounds
- **Review System**: Leave and manage reviews for campgrounds
- **Interactive Maps**: Visualize campground locations
- **Image Upload**: Share photos of campgrounds
- **Search Functionality**: Find campgrounds by name, location, or features
- **User Profiles**: Manage your campgrounds and reviews
- **Responsive Design**: Optimized for all device sizes

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap for responsive design
- EJS for templating

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose ODM for data modeling
- Passport.js for authentication

### Other Tools and Technologies
- Cloudinary for image management
- Mapbox for maps integration
- Connect-flash for flash messages
- Express-session for session management
- Method-override for HTTP method override
- Helmet for security
- JOI for data validation

## File Structure
```
YelpCamp/
├── app.js                  # Entry point for the application
├── package.json            # Project dependencies
├── package-lock.json
├── .env                    # Environment variables (create this file)
├── .gitignore
├── public/                 # Static files
│   ├── javascripts/        # Client-side JavaScript
│   ├── stylesheets/        # CSS files
│   └── images/             # Image assets
├── routes/                 # Express routes
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── models/                 # Mongoose models
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── views/                  # EJS templates
│   ├── campgrounds/
│   ├── layouts/
│   ├── partials/
│   ├── reviews/
│   └── users/
├── middleware/             # Custom middleware
│   └── index.js
├── controllers/            # Route controllers
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── seeds/                  # Seed data for development
│   └── index.js
└── utils/                  # Utility functions
    ├── catchAsync.js
    └── ExpressError.js
```

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

You'll also need accounts for the following services:
- [Cloudinary](https://cloudinary.com/) (for image uploads)
- [Mapbox](https://www.mapbox.com/) (for maps)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/YelpCamp.git
   cd YelpCamp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```plaintext
   PORT=3000
   DB_URL=mongodb://localhost:27017/yelp-camp
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   SECRET=your_session_secret
   ```

4. Seed the database (optional):
   ```bash
   node seeds/index.js
   ```

## Running the Application

1. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

2. Start the application:
   ```bash
   npm start
   ```

   For development with automatic restarts:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```plaintext
   http://localhost:3000
   ```

## API Endpoints

### Campgrounds

- `GET /campgrounds` - Get all campgrounds
- `POST /campgrounds` - Create a new campground
- `GET /campgrounds/new` - Form to create a new campground
- `GET /campgrounds/:id` - Show a specific campground
- `PUT /campgrounds/:id` - Update a specific campground
- `DELETE /campgrounds/:id` - Delete a specific campground
- `GET /campgrounds/:id/edit` - Form to edit a campground

### Reviews

- `POST /campgrounds/:id/reviews` - Create a review for a campground
- `DELETE /campgrounds/:id/reviews/:reviewId` - Delete a review

### Users

- `GET /register` - Registration form
- `POST /register` - Create a new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- Implement a rating system for reviews
- Add social media sharing functionality
- Create a user dashboard with statistics
- Implement advanced search filters
- Add a booking system for campgrounds
- Create a mobile application
- Implement real-time notifications
- Add multilingual support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Colt Steele's Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) for inspiration
- [Bootstrap](https://getbootstrap.com/) for the responsive design
- [Mapbox](https://www.mapbox.com/) for the maps API
- [Cloudinary](https://cloudinary.com/) for image hosting
- All the open-source libraries used in this project

