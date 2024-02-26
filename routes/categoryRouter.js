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

router.post('/', isAdmin, async(req, res) => {
    try{
        const category = new CategoryModel(req.body);
        let newCategory = await category.save();
        if(!newCategory){
            return res.status(400).json({message: "Category not added"});
        }
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: 'Server error', ErrorMessage: err });
    }

});

//--------------------------------------- Delets -----------------------------------------------------


//--------------------------------------- Puts -----------------------------------------------------


module.exports = router;