const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.json({message : err});
    }
});


//Create new Post
router.post('/', async (req, res) => {
    const post = new Post({
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);  
    }catch(err){
        res.json({message : err});
    }
    
});

module.exports = router;