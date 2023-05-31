//For Post of Discussion Channel
const express = require('express')
const router = express.Router();
const Discussion=require('../models/Discussion');
const loginCheck = require('../middleware/loginCheck');
router.post('/add-discussion',loginCheck, async(req,res) => {
    const newdiscussion = new Discussion(req.body);
    try{
        await newdiscussion.save()
        res.status(201).json({
            status: 'Doubt Posted Successfully',
            data : {
                newdiscussion
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
  })
  
  router.get('/get-discussions',loginCheck, async(req,res) => {
    const discussions = await Discussion.find({})
    try{
        res.status(201).json({
            status: 'Success',
            data : {
                discussions
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed to load doubts due to internal server error',
            message : err
        })
    }
  })
  router.patch('/update-discussions/:id',loginCheck, async (req,res) => {
    const discussions = await Discussion.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Post Updated Successfully',
            data : {
              discussions
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