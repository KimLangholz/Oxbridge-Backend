const express = require('express');
const router = express.Router();
const User = require('../models/User');

/*// Validate request
if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
    res.status(400).send({ message: "Email, password, firstname and lastname all needs to be filled out!" });
    return;
}*/

//Get all the users
router.get('/', async (req, res) => {
    try{
        const users = await Post.find();
        res.json(users);
    }catch (err){
        res.json({message : err});
    }
});

// Create new User
router.post('/', async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    try {
        const savedUser = await post.save();
        res.json(savedUser);  
    }catch(err){
        res.json({message : err});
    }
    
});

module.exports = router;