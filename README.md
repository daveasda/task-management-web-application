# Task Management Web Application

## Overview

This is a full-stack task management web application built with React, Express, Node.js, and PostgreSQL.

The application provides separate functionality for normal users and administrators.
<img width="1920" height="927" alt="login page" src="https://github.com/user-attachments/assets/83eda8df-e784-4400-98a0-5b4be8e2718f" />
<img width="1920" height="927" alt="frontend-09-10-2026_11_53_AM" src="https://github.com/user-attachments/assets/cb9c7c1d-49ff-40ac-b47f-d05154577607" />
<img width="1920" height="887" alt="frontend-09-10-2026_11_27_AM" src="https://github.com/user-attachments/assets/e8af2318-325a-4477-a5bd-d7c7d9005d87" />
<img width="1920" height="887" alt="dashboard" src="https://github.com/user-attachments/assets/6658fa2f-db8a-4ee1-8992-e2717be88b7f" />
<img width="1920" height="927" alt="admin-dashboard" src="https://github.com/user-attachments/assets/88fbab5a-ef5f-4406-a8ee-50f24f4e9467" />

Normal users can:

- Register and log in
- Drag and drop tasks
- Create tasks
- Organize tasks into Kanban columns
- Move tasks through different statuses such as:
  - To Do
  - Doing
  - Done


Administrators can:

- Log in through the same login page
- Access a separate Admin Dashboard
- View normal users
- Select a user from a dropdown
- View the selected user's tasks

Dummy admin login details:
Username:Admin
Password:admin

Features not created yet:
- Delete mechanism of tasks
- Password encryption
- Admin seed script has been made, however Render does not permit shell acess to run it on the deployed version

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL
- Source Control: GitHub


### Frontend

Hosted on Vercel:

https://task-management-web-application-ten.vercel.app

This is the main URL users should use to access the application.

### Backend

Hosted on Render:

https://task-management-web-application-w0jq.onrender.com


### Database

The production PostgreSQL database is hosted on Render.
