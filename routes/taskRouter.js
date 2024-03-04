const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuth } = require('../utils/auth');
const TaskModel = require('../models/tasksModel');
const UserModel = require('../models/userModel');
const CategoryModel = require('../models/categoryModel');

// this is a test

router.use(isAuth);

//--------------------------------------- Gets -----------------------------------------------------
router.get('/', (req, res) => {
    TaskModel.find({ authorId: req.userId }).populate('category')
        .then(result => res.status(200).json(result))
        .catch(err => res.status(401).json(err));
});

//--------------------------------------- Posts -----------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ name: req.body.category });
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }
        req.body.category = category._id;

        const task = new TaskModel(req.body);

        const result = await task.save();
        req.body.taskId = result._id;

        const user = await UserModel.findByIdAndUpdate(
            req.userId,
            { $push: { tasks: req.body.taskId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ Msg: "Task Added", Tasks: user.tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// this is a test

//--------------------------------------- Delets -----------------------------------------------------
router.delete('/:id', (req, res) => {
    UserModel
        .findById(req.userId)
        .then(user => {
            if (!user.tasks.includes(req.params.id)) {
                return res.status(401).json({ Msg: "Task not found" });
            } else {
                TaskModel.findByIdAndDelete(req.params.id)
                    .then(result => {
                        UserModel
                            .findByIdAndUpdate(req.userId, { $pull: { tasks: new mongoose.Types.ObjectId(req.params.id) } }, { new: true })
                            .then(result => res.status(200).json({ Msg: "Task Deleted", Tasks: result.tasks }))
                            .catch(err => res.status(404).json(err));
                    })
                    .catch(err => res.status(404).json(err.message));
            }
        })
        .catch(err => res.status(404).json(err));
});

//--------------------------------------- Puts -----------------------------------------------------
router.patch('/:id', (req, res) => {
    TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(404).json(err));
});

module.exports = router;