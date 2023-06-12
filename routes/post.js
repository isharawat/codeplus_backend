// For posts of announcement channel
const express = require('express')
const router = express.Router();
const loginCheck=require('../middleware/loginCheck')
const Post = require('../models/Post');
router.post('/add-posts',loginCheck, async(req,res) => {
    const newpost = new Post(req.body);
    try{
        await newpost.save()
        res.status(201).json({
            status: 'Posted Successfully',
            data : {
                newpost
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
  })
  
  router.get('/get-posts', async(req,res) => {
    const posts = await Post.find({})
    try{
        res.status(201).json({
            status: 'Success',
            data : {
                posts
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed to load posts due to internal server error',
            message : err
        })
    }
  })
  
  router.patch('/update-post/:id', loginCheck, async (req,res) => {
    
    try{
      const updatedposts = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
        res.status(200).json({
            status : 'Post Updated Successfully',
            data : {
              updatedposts
            }
          })
    }catch(err){
      res.status(500).json({
          status: 'Failed to Update post due to internal server error',
          message : err
      })
    }
  })
  
  router.delete('/delete-post/:id',loginCheck, async(req,res) => {
    
    
    try{
      await Post.findByIdAndDelete(req.params.id)
      res.status(204).json({
          status : 'Successfully deleted',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed to delete the post',
            message : err
        })
    }
  })
  
  module.exports = router;