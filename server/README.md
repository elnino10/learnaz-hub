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