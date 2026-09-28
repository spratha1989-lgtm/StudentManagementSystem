# Student Management System

A full-stack Student Management System built using ASP.NET Core Web API,
React.js, and SQL Server.

## Features

- Add student
- View all students
- View student by ID
- Update student
- Delete student
- RESTful APIs
- SQL Server database
- Entity Framework Core
- React frontend
- CORS configuration
- Swagger/OpenAPI

## Technology Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Axios

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- REST API
- Swagger/OpenAPI

### Database
- Microsoft SQL Server

## Project Structure

StudentManagementSystem
│
├── StudentManagementAPI
│   ├── Controllers
│   ├── Data
│   ├── Models
│   └── Migrations
│
├── StudentManagementFrontend
│   └── src
│
├── .gitignore
└── README.md

## CRUD Operations

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/Students | Get all students |
| GET | /api/Students/{id} | Get student by ID |
| POST | /api/Students | Add student |
| PUT | /api/Students/{id} | Update student |
| DELETE | /api/Students/{id} | Delete student |

## Database

The application uses SQL Server with Entity Framework Core.

Student fields:

- Id
- Name
- Email
- Course
- Age

## How to Run

### Backend

```bash
cd StudentManagementAPI
dotnet restore
dotnet run
