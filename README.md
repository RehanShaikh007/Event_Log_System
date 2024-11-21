# Event Logging System

This is an event logging system built using the **MERN** stack (MongoDB, Express, React, Node.js). It allows users to log and track events with details such as event type, source, time, and data. It also features a dashboard that visualizes these events over time with a chart.

## Table of Contents

- [Project Overview](#project-overview)
- [ScreenShots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Backend](#backend)
- [Usage](#usage)
  

## Project Overview

This Event Logging System allows users to:

1. **Log Events:** Users can submit logs with event type, source application, timestamp, and associated data.
2. **View Logs:** Users can view a list of event logs with details about each log.
3. **Visualize Logs:** A dashboard provides a graphical representation of event logs over time, displaying the number of events per day.

## ScreenShots
![image1](https://github.com/user-attachments/assets/1c717475-a978-4203-a60c-9cd002c01fbe)
![image2](https://github.com/user-attachments/assets/99478900-9b54-4756-9084-6eb5c8cf4bd6)
![image3](https://github.com/user-attachments/assets/297f957f-e3bc-43c1-872d-239e99340aa8)
![image4](https://github.com/user-attachments/assets/b50b8da3-5a15-4b65-8969-24eb2c48475d)


## Features

- **Log Event Submission:** A form to submit event logs.
- **Event Log List:** Displays all logged events in a structured list.
- **Event Log Dashboard:** A visual chart of event logs over time.
- **Responsive UI:** The app is responsive and works across all devices.
- **Dynamic Navigation:** The navigation link updates dynamically based on the current page.

## Tech Stack

- **Frontend:**
  - React.js
  - React Router
  - React-Chart.js
  - Axios for API calls
  - Tailwind CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for database

- **Development Tools:**
  - Vite for frontend build tool
  - npm/yarn for package management

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB (or use a cloud service like MongoDB Atlas)

### Steps to Install

1. **Clone the repository:**

```bash
   git clone https://github.com/RehanShaikh007/Event_Log_System
   cd event-logging-system
```

2. **Backend Setup:**
- Go to the backend directory:

```bash
   cd backend
```
- Install the backend dependencies:

```bash
  npm install
```
- Set up environment variables:
 - Create a .env file and add your MongoDB connection URL.
 - Example .env file:

```bash
  MONGO_URI=mongodb://localhost:27017/event-logging-db
  PORT=3000
```
- Start the backend server:
    
```bash
  npm start
```

3. **Frontend Setup:**
- Go to the frontend directory:
```bash
   cd frontend
```
- Install the frontend dependencies:
```bash
   npm install
```
- Start the frontend development server:
```bash
   npm run dev
```
The app will be available at http://localhost:5173.

## API Endpoints
- GET /api/logs/dashboard
  Fetches the event logs for the dashboard chart.
  - Response:
   - Status: 200 OK
   - Body:
     ``` bash
     [
     {
     "_id": "2024-11-21",
     "count": 3
     },
     ...
     ] 

     ```
- GET /api/logs
  Fetches the list of all event logs.
  - Response:
   - Status: 200 OK
   - Body:
     ``` bash
     [
     {
     "_id": "1",
     "eventType": "Error",
     "sourceAppId": "App1",
     "timestamp": "2024-11-21T12:00:00Z",
     "dataPayload": { "message": "Something went wrong" }
     },
     ...
     ]

     ```
- POST /api/logs
  Creates a new event log.

   - Request Body:
     ``` bash
     {
     "eventType": "Error",
     "sourceAppId": "App1",
     "timestamp": "2024-11-21T12:00:00Z",
     "dataPayload": { "message": "Something went wrong" }
      }

     ```
## Frontend
  The frontend of the Event Logging System is built with React.js. It communicates with the backend API to fetch and display logs and updates the dashboard with a line chart of event counts over time.
  ### Components
  - **LogForm:** Form to log new events.
  - **LogList:** Displays a list of all event logs.
  - **LogDashboard:** Displays a line chart representing the event logs over time.
  ### Technologies Used
  - **React Router** for routing between pages (Home, Dashboard).
  - **Chart.js** for displaying a line chart.
  - **Tailwind CSS** for styling the application.
   
## Backend
   The backend is built with Node.js and Express.js. It interacts with a MongoDB database to store event logs.

 ### Models
 - Log Model: Represents an event log with properties like eventType, sourceAppId, timestamp, and dataPayload.
 ### Routes
 - **GET /api/logs:** Fetch all logs.
 - **GET /api/logs/dashboard:** Fetch log data for the dashboard chart.
 - **POST /api/logs:** Create a new log.

## Usage
- Once the app is running, navigate to the home page (/) to log new events and view the event list.
- You can click "Go To Dashboard" to see the event logs visualized in a chart.
- When on the dashboard, the link will change to "Back To Home".
