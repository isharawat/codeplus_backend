const express = require('express')
const router = express.Router();
const Question = require('../models/Question');
const loginCheck = require('../middleware/loginCheck');

  
//Questions

router.post('/add-question',loginCheck, async(req,res) => {
  
    const newquestion = new Question(req.body)
    try{
        await newquestion.save()
        res.status(201).json({
            status: 'Success',
            data : {
                newquestion
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
  })
  
  router.get('/get-questions',loginCheck,  async (req,res) => {
    const questions= await Question.find({})
    try{
      res.status(201).json({
          status: 'Success',
          data : {
              questions
          }
      })
  }catch(err){
      res.status(500).json({
          status: 'Failed to fetch the questions.',
          message : err
      })
  }
  })
  
  router.patch('/update-question/:id',loginCheck,  async (req,res) => {
      const updatedquestions = await Question.findByIdAndUpdate(req.params.id,req.body,{
          new : true,
          runValidators : true
        })
      try{
          res.status(200).json({
              status : 'Successfully updated the question',
              data : {
                updatedquestions
              }
            })
      }catch(err){
          res.status(500).json({
              status: 'Failed to update the question.',
              message : err
          })
      }
  })
  
  
  router.delete('/delete-question/:id',loginCheck,  async(req,res) => {
    await Question.findByIdAndDelete(req.params.id)
    
    try{
        const questions= await Question.find({});
      res.status(204).json({
          status : 'Successfully deleted',
  
          data : questions,
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed to delete the question',
            message : err
        })
    }
  })
  
  module.exports = router;