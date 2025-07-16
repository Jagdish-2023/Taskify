# Taskify

A simple to-do app where users can create Todo and assign Task into it. Users can create, update and delete any Task or Todo accordingly. 

## Live
[Run](https://taskify-zeta-nine.vercel.app)

---

## Quick Start
```
git clone https://github.com/Jagdish-2023/Taskify.git
cd Taskify
npm install
npm run dev
```

## Technologies
- React, react-router, Redux
- Bootstrap
- MongoDB,Mongoose
- Node.js, Express.js

## Features
**Dashboard**
- Option to create a new Todo.
- See a list of all todos (fetched from DB).
- Bootstrap-based card layout.
- Navigate to a particular Todo details page.

**Todo Details**
- Shows all the Tasks related to that Todo.
- Add new task button.
- Update the status of Todo.
- Remove the Task or Todo.



## API Reference
**Authentication**
- POST/auth/v1/signup - Signup a new user.
- POST/auth/v1/signin - Login to your account.
- POST/auth/guest/signin - Login to a guest account.
- GET/auth/check - Check the login status (logged in or not).
- POST/auth/logout - Logout the current session.

**Todo**
- POST/v1/todos - Create a new to-do.
- POST/v1/todo/tasks - Create a new task belongs to a to-do.
- POST/v1/todo/tasks/:taskId/status - Update the status of a Task
- GET/v1/todos - Gives all the saved todos for that particular user.
- GET/v1/todos/:todoId - Gives the Todo details having all the tasks.
- DELETE/v1/todo/tasks/:taskId - Deletes a task from to-do.
- DELETE/v1/todos/:todoId - Deletes a particular to-do (all the tasks will be also removed).

**User**
- GET/v1/user - Give the user details(name, email etc.).
