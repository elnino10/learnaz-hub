# Learnaz Hub

## Description :bulb:

Learnaz Hub is an E-learning platform designed for users of all ages to learn new skills and gain knowledge in various fields. Our platform offers a wide range of courses, from technical skills to creative arts, delivered by industry experts. Our goal is to make education accessible, engaging, and effective for everyone.

The backend is built with Node.js and Express, using MongoDB as the database, while the frontend is developed with React.

## Table of Contents

- [Introduction](#description)
- [Tech Stack](#tech-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Security](#security)
  - [Authentication Service](#authentication-service)
- [High-Level Interaction Flow](#high-level-interaction-flow)
  - [User Authentication](#user-authentication)
  - [Course Enrollment and Management](#course-enrollment-and-management)
  - [Content Delivery](#content-delivery)
- [Authors](#authors)

## Tech Stack

### Backend

- **Node.js (Express)**: API server for handling core business logic, authentication, and RESTful services.
- **MongoDB**: Database for storing user, course, and enrollment data.
- **bcrypt**: Library for hashing passwords to ensure secure authentication.

### Frontend

- **React**: Main framework for building the user interface.
- **TailwindCSS**: Styling and responsive design.

## Security

### Authentication Service

- **jsonwebtoken**: User registration, login, and JWT-based authentication.
- **Role-based access control**: Supports different roles including students, instructors, and admins.

<h3 align="center">High-Level Interaction Flow</h3>

1. User Authentication:
     1. User accesses the platform via ReactJS frontend.
     2. React sends authentication requests to NodeJS.
     3. NodeJS handles authentication and returns JWT tokens.

2. Course Enrollment and Management:
     1. User browses and enrolls in courses.
     2. ReactJS frontend interacts with NodeJS API for CRUD operations.
     3. Course data is stored in MongoDB.

3. Content Delivery:
     1. User accesses course content (videos, PDFs, etc.).
     2. ReactJS frontend fetches content from NodeJS API.
     3. Content metadata and actual content are managed and served by the backend.

## Authors :black_nib:

- **Chidebere Egboka** - [elnino10](https://github.com/elnino10)
- **Lamber Joe Kpukuyou** - [Lamber22](https://github.com/Lamber22)
- **Lerato Mgwangqa** - [Ivyratermgwangqa](https://github.com/Ivyratermgwangqa)
- **Chiamaka Ogbodo** - [chimaskyy](https://github.com/chimaskyy)


