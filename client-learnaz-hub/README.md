# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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