﻿# Task Manager

This is a Task Management web application built with **React** (Vite) and **Node.js** for managing tasks, registering, logging in, and organizing tasks by status and priority.

## Features

* User Registration & Login
* Add, Edit, and Delete Tasks
* Filter tasks by Status and Priority
* Switch between Card and List views
* Responsive UI

## Tech Stack

* **Frontend**: React (Vite), Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (or replace with your preferred DB)
* **Authentication**: JWT (JSON Web Tokens)
* **API**: RESTful API for Task management

## Installation

### Clone the Repository

```bash
git clone https://github.com/rajat-valecha200/taskManagementApp.git
```

### Frontend

1. Navigate to the **frontend** directory:

   ```bash
   cd frontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

### Backend

1. Navigate to the **backend** directory:

   ```bash
   cd backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   * Create a `.env` file in the **backend** directory with the following:

     ```env
     PORT=5000
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the backend server:

   ```bash
   node server.js
   ```

The backend API will be available at `http://localhost:5000`.

## Usage

### Registration

* Visit the registration page at `/register`.
* Enter your name, email, and password.
* After successful registration, you will be redirected to the login page.

### Login

* Visit the login page at `/`.
* Enter your email and password to log in.
* Upon successful login, you will be redirected to the dashboard where you can manage tasks.

### Dashboard

* View your tasks.
* Add a new task by clicking **+ Add Task**.
* Filter tasks by **Status** (Complete/Incomplete) and **Priority** (Low, Medium, High).
* Mark tasks as complete or incomplete by toggling their status.

