const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { genToken, isAdmin, isAuth } = require('../utils/auth');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const TaskModel = require('../models/tasksModel');

//--------------------------------------- Gets -----------------------------------------------------
router.get('/', isAdmin, (req, res) => {
    UserModel
        .find()
        .then((result) => {
            // update the result to remove the password
            result = result.map(user => {
                user.password = "********";
                return user;
            });
            res.status(200).json(result);
        })
        .catch(err => res.status(404).json(err))
});

router.get('/me', isAuth, (req, res) => {
    UserModel.findById(req.userId)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(404).json(err))
});

//--------------------------------------- Posts -----------------------------------------------------
router.post('/', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password.toString(), 8);
    const user = new UserModel(req.body);
    try {
        const newUser = await user.save();
        if (!newUser) {
            return res.status(400).json({ message: "User not added" });
        }
        res.status(200).json({ Message: "User was addeded", newUser });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', ErrorMessage: err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password.toString(), user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        let token = genToken(user._id);
        // res.cookie('token', token, { httpOnly: true }); - Not in use
        return res.status(200).json({ token: token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//--------------------------------------- Puts -----------------------------------------------------

router.patch('/setAdmin/:id', isAdmin, async (req, res) => {
    if (req.special) {
        req.params.id = req.userId;
    }
    try {
        console.log("ID: " + req.params.id);
        const user = await UserModel.findByIdAndUpdate(req.params.id, { $push: { role: "Admin" } }, { new: true });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ Message: "User was updated", user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', ErrorMessage: err });
    }
});

module.exports = router;
