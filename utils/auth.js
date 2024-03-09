const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { config } = require('../config/secret');
let counter = 0;

module.exports.isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    console.log(req.body.adminPass);
    if(req.body.adminPass && req.body.adminPass === config.adminPass) {
        console.log('special request');
        req.special = true;
        // remove the adminPass from the request body
        // to make sure it wont interfere with the request
        req.body.adminPass = undefined;
    }
    const decodedToken = jwt.verify(token, config.jwtSecretKey);
    userModel.findById(decodedToken._id)
        .then(user => {
            if (user.role.includes('Admin') || req.special) {
                req.userId = user._id;
                next();
            } else {
                res.status(403).json({ message: 'Access denied. You are not an admin.' });
            }
        })
        .catch(err => res.status(500).json({err: "Server Error"}));
};

module.exports.isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`inside isAuth ${counter++}`);
    if(!token) {
        return res.status(404).json({ message: 'No User' });
    }
    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'Unauthorized2' });
        } else {
            req.userId = decoded._id;
            next();
        }
    });
}

module.exports.genToken = (userId) => {
    let token = jwt.sign({ _id: userId }, config.jwtSecretKey, { expiresIn: "15 days" });
    return token;
}