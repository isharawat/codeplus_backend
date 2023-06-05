// For post of Women Community Channel
const express = require('express')
const router = express.Router();
const loginCheck = require('../middleware/loginCheck');
const WomenPost=require('../models/WomenPost');
router.post('/add-women-post', loginCheck, async(req,res) => {
    const newWomenPost = new WomenPost(req.body);
    try{
        await newWomenPost.save();
        res.status(201).json({
            status: 'Posted Successfully',
            data : {
                newWomenPost
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
  })
  
  router.get('/get-women-posts', async(req,res) => {
    const womenposts = await WomenPost.find({})
    try{
        res.status(201).json({
            status: 'Success',
            data : {
                womenposts
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed to load posts due to internal server error',
            message : err
        })
    }
  })

  router.patch('/women-update-post/:id', loginCheck, async (req,res) => {
    const updatedwomenposts = await WomenPost.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Post Updated Successfully',
            data : {
              updatedwomenposts
            }
          })
    }catch(err){
      res.status(500).json({
          status: 'Failed to Update post due to internal server error',
          message : err
      })
    }
  })
  module.exports = router;