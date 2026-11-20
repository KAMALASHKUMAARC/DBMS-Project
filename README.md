# Quickshow
# Movie Booking App (MERN Stack)

A full-stack movie booking web application built using the MERN stack.  
It allows users to browse movies, view show timings, book seats, and manage bookings with authentication and a responsive UI.

---

## Features

### User Features
- User registration and login with JWT authentication
- OTP verification via Nodemailer
- Browse latest movies (fetched from TMDB API)
- View movie details (poster, overview, rating, runtime, etc.)
- View available show timings
- Book seats with mock payment flow
- My Bookings page to manage bookings
- Add/remove favorite movies
- Fully responsive UI for all devices

---

### Admin Features
- Global admin dashboard
- Add and manage movies
- Create and manage shows (date & time)
- View total bookings per show
- View total earnings per show
- Dashboard analytics (users, revenue, active shows)

---
TMDB API Integration

This project uses The Movie Database (TMDB) API to fetch real-time movie data.
What is used from TMDB:
Now Playing Movies
Movie Details (title, poster, overview, runtime, genres)
Movie Credits (cast information)
Backdrop and poster images

## Payment System
- Mock payment system (no external gateway like Stripe/Razorpay)
- Booking is marked as paid after confirmation flow

---

## Authentication
- JWT-based authentication
- OTP verification via Nodemailer during signup
- Role-based access (User / Admin)
- Protected routes for users and admin

---

## Tech Stack

### Frontend
- React.js
- Context API
- Axios
- Tailwind CSS (or your styling tool if used)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

### Other Tool
- Nodemailer (OTP email verification)
- JWT (authentication)
- TMDB API (Movie Data Provider)
- dotenv (environment variables)

---

## Project Structure
movie-booking-app/
│
├── client/
│   ├── public/
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore

Getting Started
1. Clone the repository
      git clone <repo-url>
      cd movie-booking-app
2. Install dependencies

      Backend:
      - cd server
      - npm install
        
      Frontend:
      - cd client
      - npm install
        
3. Setup environment variables
      Create .env file in server
      Copy values from .env.example

5. Run the project

      Backend:
      npm run dev
      
      Frontend:
      npm run dev

Key Highlights
      -Secure authentication with OTP verification
      -Dynamic movie data via TMDB API
      -Role-based admin control system
      -Responsive UI/UX design


