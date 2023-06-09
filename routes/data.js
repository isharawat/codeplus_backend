const express = require('express')
const router = express.Router();
const Data = require("../models/Data")
router.post('/add-contest', async(req,res) => {
    const newData = new Data(req.body);
    try{
        await newData.save()
        res.status(201).json({
            status: 'Success',
            data : {
                data: newData,
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
  })
  
  router.post('/verifycontest',  async (req,res) => {
  
    const newCode= await Data.find(req.body);
    try{
        if(newCode == "") {
            res.status(401).json({
                status: 'Code not found',
                data : {
                  code: newCode,
                }
            })
        }
      
      else { res.status(201).json({
          status: 'Success',
          data : {
            code: newCode,
          }
      })
    }
  }catch(err){
      res.status(500).json({
          status: 'Failed to verify the contest.',
          message : err
      })
  }
  })
  
  router.delete('/delete-contest',  async(req,res) => {
    await Data.deleteOne(req.body)
    try{
      res.status(204).json({
          status : 'Successfully deleted',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed to delete the contest',
            message : err
        })
    }
  })
  
  module.exports = router;