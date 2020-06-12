const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Get all the users
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.json({message : err});
    }
});

//Get one user
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch (err){
        res.json({message : err});
    }
});

//Delete one user
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch (err){
        res.json({message : err});
    }
});

//Update one user
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId}, 
            { $set: { email: req.body.email}}
            );
        res.json(updatedPost);
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