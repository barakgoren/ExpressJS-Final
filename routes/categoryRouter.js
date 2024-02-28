const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuth, isAdmin } = require('../utils/auth');
const CategoryModel = require('../models/categoryModel');

//--------------------------------------- Gets -----------------------------------------------------
router.get('/:id', isAuth, (req, res) => {
    CategoryModel.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(404).json(err))
});

//--------------------------------------- Posts -----------------------------------------------------

router.post('/', isAdmin, async (req, res) => {
    try {
        const category = new CategoryModel(req.body);
        let newCategory = await category.save();
        if (!newCategory) {
            return res.status(400).json({ message: "Category not added" });
        }
        res.status(200).json({ Message: "Category was addeded", newCategory });
    } catch (err) {
        res.status(500).json({ message: 'Server error', ErrorMessage: err });
    }

});

//--------------------------------------- Delets -----------------------------------------------------

router.delete('/:id', isAdmin, (req, res) => {
    CategoryModel.findByIdAndDelete(req.params.id)
        .then(result => res.status(200).json({ Message: "Category was deleted", result }))
        .catch(err => res.status(404).json(err));
});


//--------------------------------------- Puts -----------------------------------------------------

router.put('/:id', isAdmin, validateUpdateFields, (req, res) => {
    const validFields = Object.keys(CategoryModel.schema.paths); 
    const fields = Object.keys(req.body);
    console.log(fields);
    console.log(validFields);
    CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(result => res.status(200).json({ Message: "Category was updated", result }))
        .catch(err => res.status(404).json(err));
});

// --------------------------------------- Middlewares -----------------------------------------------------

function validateUpdateFields(req, res, next) {
    let validFields = Object.keys(CategoryModel.schema.paths);
    const updateFields = Object.keys(req.body); 

    validFields = validFields.filter(field => field !== '_id');

    const isValidUpdate = updateFields.every((field) => validFields.includes(field));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid fields in update' });
    }

    next();
}

module.exports = router;