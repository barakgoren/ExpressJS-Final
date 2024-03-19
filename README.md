# 📝 Task Management API 
![Status](https://img.shields.io/badge/Status-Done-green)
![GitHub last commit](https://img.shields.io/github/last-commit/barakgoren/ExpressJS-Final)
[![wakatime](https://wakatime.com/badge/github/barakgoren/ExpressJS-Final.svg?)](https://wakatime.com/badge/github/barakgoren/ExpressJS-Final)

## 🔴 Live test

You can check this API live on this link : https://calm-dress-bear.cyclic.app/

## 👋 Introduction

This is a RESTful API for a task management application. It allows users to create, read, update, and delete tasks, and associate them with categories.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- Nodemon (For dev mode)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/barakgoren/ExpressJS-Final.git
```
2. Install dependencies:
```bash
npm install
```

### ⚙️ Configuration

- Create a new ".env" file and insert the fields:
  - JWT_SECRET_KEY - for configuring JWT.
  - USER_DB - The user name to your Atlas if you are using atlas
  - PASS_DB - The password to your Atlas if you are using atlas
  - ADMIN_PASS - This is the password you use to set yourself as an Admin.

- Modify the MongoDB URL to your Atlas URL or local URL on the [app.js](./app.js) file.
  #### Example for running locally:
  ```javascript
  mongoose.connect(`http://localhost:27017`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err);
    })
  ```


### Running - Choose step 1 or 2:

1. Start the server with Nodemon on Development mode:
```bash
npm run dev
```
2. Start the server with Node.js:
```bash
npm start
```

## 📚 API Documentation

### 🚹 User Routes

Type| Route | Prerequisites | Description
----| -------- | -------- | --------- 
| ![Badge](https://img.shields.io/badge/GET-0) | `/users`| ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000) | Get all the users
| ![Badge](https://img.shields.io/badge/GET-0) | `/users/me`| ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Get your user details
| ![Badge](https://img.shields.io/badge/POST-FFA600)  | `/users` | | Create new user
| ![Badge](https://img.shields.io/badge/POST-FFA600) | `/users/login` | | Log in to an existing user - Getting a token back
| ![Badge](https://img.shields.io/badge/PATCH-A35DDC) | `/users/setAdmin/:id` | ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000) | Set a new admin. You can also use it to set yourself an admin by using the "adminPass" attribute on the config.js. Just send an "adminPass" on the body of the PATCH request.

#### 👤 Create new User body:

```json
{
    "name": "your name",
    "email": "yourEmail@gmail.com",
    "age": 30,
    "password": "your password"
}
```

#### 👤 Login body:

```json
{
    "email": "yourEmail@gmail.com",
    "password": "your password"
}
```

### 📝 Task Routes

Type| Route | Prerequisites | Description
----| -------- | -------- | ---------
| ![Badge](https://img.shields.io/badge/GET-0)  |`/tasks`| ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000) | Get all the tasks
| ![Badge](https://img.shields.io/badge/GET-0)  |`/tasks/myTasks`| ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Get the tasks of the current user.
| ![Badge](https://img.shields.io/badge/POST-FFA600)  | `/tasks` | ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Create new task. |
![Badge](https://img.shields.io/badge/DELETE-FF6B6B) | `/tasks/:id` | ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Delete an existing task by its ID.
![Badge](https://img.shields.io/badge/PATCH-A35DDC) | `/tasks/:id` | ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Updating an existing task by its ID.

#### 📝 Create new Task body:

```json
{
    "title": "Task name",
    "category": "Category ID",
    "dueDate": "yyyy-MM-dd",
    "description": "Task description"
}
```


### 🏷️ Category Routes
Type| Route | Prerequisites | Description
----| -------- | -------- | ---------
| ![Badge](https://img.shields.io/badge/GET-0)  |`/categories`|  | Get all the categories
| ![Badge](https://img.shields.io/badge/GET-0)  |`/categories/:id`| ![Badge](https://img.shields.io/badge/Auth%20Required-00FFFF) | Get the categories of the tasks by its ID
![Badge](https://img.shields.io/badge/POST-FFA600) |`/categories`|  ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000)| Create a new category
![Badge](https://img.shields.io/badge/DELETE-FF6B6B) |`/categories/:id`|  ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000)| Delete a category
![Badge](https://img.shields.io/badge/PATCH-A35DDC) |`/categories/:id`|  ![Badge](https://img.shields.io/badge/Admin%20Only-FF0000)| Update a category

#### 🏷️ Create new Category body:

```json
{
    "name": "Category name",
    "description": "Category description"
}
```


## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](https://github.com/barakgoren/ExpressJS-Final/issues) if you want to contribute.
