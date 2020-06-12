const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');

//Get all the users
router.get('/', async (req, res) => {
    try{
        const users = await adminModel.find();
        res.json(users);
    }catch (err){
        res.json({message : err});
    }
});

// Create new User
router.post('/', async (req, res) => {
    const user = new adminModel({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);  
    }catch(err){
        res.json({message : err});
    }
    
});

//Get one user
router.get('/:userId', async (req, res) => {
    try{
        const oneUser = await adminModel.findById(req.params.userId);
        res.json(oneUser);
    }catch (err){
        res.json({message : err});
    }
});

//Update one user
router.patch('/:userId', async (req, res) => {
    try{
        const updatedUser = await adminModel.updateOne(
            { _id: req.params.userId}, 
            { $set: { email: req.body.email}}
            );
        res.json(updatedUser);
    }catch (err){
        res.json({message : err});
    }
});

module.exports = router;