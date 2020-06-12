const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');


    /*// Validate request
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "Email and/or Password cannot be empty!" }); 
    }*/

        //Create new Admin
        router.post('/', async (req, res) => {
            const user = new adminModel({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            });
            try {
                const savedUser = await user.save();
                res.json(savedUser);  
            }catch(err){
                res.json({message : err});
            }
            
        });


    


//Get all the admin users
router.get('/', async (req, res) => {
    try{
        const adminUsers = await adminModel.find();
        res.json(adminUsers);
    }catch (err){
        res.json({message : err});
    }
});



//Get one admin user
router.get('/:adminUserId', async (req, res) => {
    try{
        const oneAdminUser = await adminModel.findById(req.params.adminUserId);
        res.json(oneAdminUser);
    }catch (err){
        res.json({message : err});
    }
});

//Update one admin user
router.patch('/:adminUserId', async (req, res) => {
    try{
        const updatedAdminUser = await adminModel.updateOne(
            { _id: req.params.adminUserId}, 
            { $set: { email: req.body.email}}
            );
        res.json(updatedAdminUser);
    }catch (err){
        res.json({message : err});
    }
});



module.exports = router;