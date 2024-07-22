# Learnaz Hub

Welcome to Learnaz Hub, an e-learning platform designed to facilitate online education for students and instructors. This repository contains the source code for both the frontend and backend components of the application.

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend](#backend)
- [License](#license)

## About the Project

Learnaz Hub is an e-learning platform that enables users to enroll in courses, view course content, and track their progress. Instructors can create and manage courses, and administrators have the ability to oversee the entire platform.

## Technologies Used

- **Frontend:**
  - React
  - Material-UI
  - Axios
  - Vite

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT

## Getting Started

To get a local copy up and running, follow the instructions below.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

Clone the repository:

```bash
git clone https://github.com/elnino10/learnaz-hub.git
cd learnaz-hub
```

## Frontend

For detailed information on the frontend setup and structure, please refer to the [Frontend README](./client/README.md).

## Backend

For detailed information on the backend setup and structure, please refer to the [Backend README](./server/README.md).

## License

Distributed under the MIT License. See `LICENSE` for more information.
```

### Frontend `README.md` (located in `client/README.md`)

```markdown
# Learnaz Hub Frontend

This directory contains the frontend source code for Learnaz Hub, an e-learning platform.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## Introduction

The frontend of Learnaz Hub is built using React, Material-UI for UI components, and Axios for making HTTP requests. Vite is used as the build tool.

## Technologies Used

- React
- Material-UI
- Axios
- Vite

## Getting Started

To get started with the frontend development, follow these steps:

### Installation

Navigate to the `client` directory and install the dependencies:

```bash
cd client
npm install
```

### Running the Application

To run the application in development mode:

```bash
npm run dev
```

This will start the development server and open the application in your default browser.

## Project Structure

- `public`: Static files
- `src`: Source code
  - `admin`: Admin-related pages and components
  - `components`: Reusable components
  - `data`: Static data and mock data
  - `pages`: Different pages of the application
  - `services`: API calls and service functions
  - `App.jsx`: Main application component
  - `index.jsx`: Entry point of the application

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run serve`: Serve the production build

For more details on the available scripts, refer to the `package.json` file.
```

### Backend `README.md` (located in `server/README.md`)

```markdown
# Learnaz Hub Backend

This directory contains the backend source code for Learnaz Hub, an e-learning platform.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## Introduction

The backend of Learnaz Hub is built using Node.js and Express, with MongoDB as the database. Mongoose is used for data modeling and JWT for authentication.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## Getting Started

To get started with the backend development, follow these steps:

### Installation

Navigate to the `server` directory and install the dependencies:

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory and add the following environment variables:

```plaintext
PORT=5000
DB_NAME=learnaz_hub_db
DB_PASSWORD=Learnaz.Hub.Db.Password!
DB_URI='mongodb+srv://learnaz_hub_db_user:<PASSWORD>@cluster0.cxptggo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
JWT_SECRET=Learnaz_Hub_Super_Secret_Key!!!
```

### Running the Application

To run the application in development mode:

```bash
npm run dev
```

This will start the backend server.

## Project Structure

- `controllers`: Route controllers
- `models`: Mongoose models
- `routes`: Express routes
- `utils`: Utility functions
- `app.js`: Main application file

## Available Scripts

- `npm run dev`: Start the development server
- `npm run start`: Start the production server

For more details on the available scripts, refer to the `package.json` file.
```