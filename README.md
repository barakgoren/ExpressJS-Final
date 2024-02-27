# 📝 Task Management API 
![Status](https://img.shields.io/badge/Status-Ongoing-yellow)
![GitHub last commit](https://img.shields.io/github/last-commit/barakgoren/ExpressJS-Final)
[![wakatime](https://wakatime.com/badge/github/barakgoren/ExpressJS-Final.svg?)](https://wakatime.com/badge/github/barakgoren/ExpressJS-Final)


This is a RESTful API for a task management application. It allows users to create, read, update, and delete tasks, and associate them with categories.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone this repository:
```bash
git clone https://github.com/barakgoren/ExpressJS-Final.git
```
2. Install dependencies:
```bash
npm install
```
1. Start the server:
```bash
npm start
```


## 📚 API Documentation

### 🚹 User Routes

Type| Route | Prerequisites | Description
----| -------- | -------- | ---------
| <span style="color:#00FF00">GET</span>  |`/users`| ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000) | Get all the users
| <span style="color:Orange">POST</span>  | `/users` | | Create new user  
| <span style="color:Orange">POST</span> | `/users/login` | | Log in to an existing user - Getting a token back

### 📝 Task Routes

Type| Route | Prerequisites | Description
----| -------- | -------- | ---------
| <span style="color:#00FF00">GET</span>  |`/tasks/myTasks`| ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Get the tasks of the current user.
| <span style="color:Orange">POST</span>  | `/tasks/newTask` | ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Create new task. |
<span style="color:#FF6B6B">DELETE</span> | `/tasks/deleteTask/:id` | ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Delete an existing task by its ID.
<span style="color:#008BFF">PUT</span> | `/tasks/updateTask/:id` | ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Updating an existing task by its ID.


### 🏷️ Category Routes
Type| Route | Prerequisites | Description
----| -------- | -------- | ---------
| <span style="color:#00FF00">GET</span>  |`/categories/:id`| ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Get the categories of the tasks by its ID
<span style="color:Orange">POST</span>  |`/categories`|  ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000)| Create a new category




## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](https://github.com/barakgoren/ExpressJS-Final/issues) if you want to contribute.
