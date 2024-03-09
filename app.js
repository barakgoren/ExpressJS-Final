const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
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
// Default route
app.get('/', (req, res) => { res.send('Welcome to the Tasks API') });
// 404 route
app.use('*', (req, res) => {res.status(404).send('Route not exist');});


mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.frzuroc.mongodb.net/TasksAPI`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err);
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
