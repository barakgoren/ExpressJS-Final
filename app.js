const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const db = require('./db');
const port = process.env.PORT || 3001;

// Routers
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const categoryRouter = require('./routes/categoryRouter');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);

db.connect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

