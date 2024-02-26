const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuth } = require('../utils/auth');
const TaskModel = require('../models/tasksModel');

//--------------------------------------- Posts -----------------------------------------------------
router.post('/', isAuth, (req, res) => {
    const task = new TaskModel(req.body);
    task.save()
        .then(result => {
            req.body.taskId = result._id;
            res.redirect('/users/newTask');
        })
        .catch(err => res.status(401).json(err));
});

module.exports = router;