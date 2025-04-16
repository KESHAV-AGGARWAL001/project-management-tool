# Project Management Tool

A full-stack project management application built with React, Node.js, Express, and MongoDB. The application allows teams to manage projects, tasks, and communication effectively.

## Features

### Authentication & Authorization
- User registration and login system
- Role-based access control (Admin, Manager, User)
- JWT token-based authentication
- Password reset functionality

### Project Management
- Create and manage projects 
- Add/remove team members
- Set project deadlines
- Track project progress
- View project details and statistics

### Task Management
- Create tasks with title, description, and due dates
- Assign tasks to team members
- Update task status (assigned, in progress, complete)
- Track task deadlines with calendar view
- View all tasks for a project

### Communication
- Real-time chat functionality using Socket.IO
- Project-specific chat rooms
- Email notifications for important updates
- Activity logging for project events

### Reports & Analytics
- Project progress reports
- User task completion reports
- Activity logs and audit trails

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- React Router for navigation 
- Tailwind CSS for styling
- Socket.IO client for real-time features
- EmailJS for email notifications
- React Big Calendar for task scheduling

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Socket.IO for real-time communication
- JWT for authentication
- Bcrypt for password hashing
- Rate Limiter ( Sliding Window Log) is used

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   ├── ActivityControllers.js
│   │   ├── AdminControllers.js
│   │   ├── ChatControllers.js
│   │   ├── MessageController.js
│   │   ├── NotificationControllers.js
│   │   ├── ProjectControllers.js
│   │   ├── TaskControllers.js
│   │   ├── TeamControllers.js
│   │   └── UserControllers.js
│   ├── models/
│   │   ├── ActivityModel.js
│   │   ├── ChatModel.js
│   │   ├── MessageModel.js
│   │   ├── NotificationModel.js
│   │   ├── ProjectModel.js
│   │   ├── TaskModel.js
│   │   ├── TeamModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   ├── ActivityRoutes.js
│   │   ├── AdminRoutes.js
│   │   ├── ChatRoutes.js
│   │   ├── MessageRoutes.js
│   │   ├── ProjectRoutes.js
│   │   ├── TaskRoutes.js
│   │   └── UserRoutes.js
│   ├── utils/
│   │   ├── DbConnection.js
│   │   └── generateToken.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── _components/
│       │   ├── auth/
│       │   ├── calender/
│       │   ├── chat/
│       │   └── project/
│       ├── storeRedux/
│       │   └── slices/
│       ├── utils/
│       ├── App.js
│       └── index.js
```

## Setup & Installation

1. Clone the repository
2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Configure environment variables in `backend/.env`:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4. Start the servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## API Endpoints

### User Routes
- POST /api/user/register - Register new user
- POST /api/user/login - User login
- GET /api/user/profile - Get user profile
- POST /api/user/resetPassword - Reset password

### Project Routes
- POST /api/project/postNewProject - Create new project
- GET /api/project/getProjectDetails/:projectId - Get project details
- POST /api/project/addNewMember/:id - Add member to project
- GET /api/project/getProjectMembers/:projectId - Get project members

### Task Routes
- POST /api/task/createTask - Create new task
- GET /api/task/getAllTasks/:projectId - Get project tasks
- PUT /api/task/updateTask - Update task
- DELETE /api/task/deleteTask - Delete task

### Chat Routes
- POST /api/chat/create - Create chat room
- GET /api/chat/project/:projectId - Get project chats
- POST /api/messages/sendMessage - Send message
