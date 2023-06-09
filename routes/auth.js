const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const loginCheck = require('../middleware/loginCheck');
const JWT_SECRET="mohsinisagoodb$oy"
// Registration
router.post('/register',async(req,res)=>{
    console.log(req.body);
    const emailId =req.body.emailId;
    console.log(req.body);
    const user = await User.findOne({emailId});
    if(user) {
        res.status(403).json({
            message: "User already exists"
        })
    }
    else{
        const password=req.body.password;
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt);
        req.body.password=secPass;
        try {
            const user = new User(req.body)
            await user.save();
            success = true;
            res.json({message:"User Created"});
          } catch (error) {
            console.log(error.message)
            res.status(500).json("Internal server Error")
          }
        }
})

//login
router.post('/login',async(req,res)=>{
    const {emailId,password} =req.body;
    let success = false;
    try {
      const user = await User.findOne({ emailId: emailId })
      if (!user) {
        return res.status(400).json("Invalid Credintials")
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json("Invalid Credintials")
      }
      const data = {
        user: {
          id: user._id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      success = true
      console.log(user);
      res.json({ success, authToken: authToken,message:"User Created",user: user })
    } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal server Error")
    }
})
router.post("/getuser", loginCheck, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server Error")
  }
})
router.get("/getAllUsers", loginCheck, async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server Error")
  }
})
module.exports = router;