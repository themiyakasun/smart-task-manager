# Smart Task Manager

## Overview 
Smart Task Manager is a full-stack web application designed to help users efficiently manage their daily tasks. It provides essential CRUD operations for tasks along with advanced features such as filtering, sorting, searching, and user authentication.

## Tech Stack 
- **Frontend:**  React Router v7 (Vite) 
- **Backend:** C# .NET Web API  
- **Database:** Microsoft SQL Server 

## Features Implemented
### Core Features:
- Add new tasks
- View tasks in a list
- Update existing tasks
- Delete tasks
- User authentication (sign up, login)

### Extra Features:
- Filter tasks by status (e.g., pending, in-progress, completed)
- Sort tasks by date
- Search tasks by title and description

## Setup Instructions
1. Clone repository
- git clone https://github.com/themiyakasun/smart-task-manager.git
- cd smart-task-manager
2. Install dependencies
- **Frontend**
  - cd frontend
  - npm install
- **Backend**
  - cd backend/SmartTaskManagementAPI
  - dotnet restore
- **Database**
  - Open SQL Server Management Studio (SSMS) and Create a new database
  - Go to appsettings.json in the backend project
  - Update "DefaultConnection" with your SQL Server credentials
  - Apply Migrations (update-database)
3. Run app
- **Frontend**
  - npm run dev
- **Backend**
  - dotnet run

## Known Issues 
- Make sure the backend server is running at http://localhost:5140
- If you get this error "can't access property "useRef" or "useState", resolveDispatcher()" simply reload the page. I fixed it by set SSR to false in route config. 

     
