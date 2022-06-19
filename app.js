const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const port = 3001;
const dotenv= require('dotenv');
dotenv.config({path: './config.env'});
require('./db/conn');

const Post = require('./models/Post');
// require model
var User = require('./models/User');

const Question = require('./models/Question');

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Registration
app.post('/register',async(req,res)=>{
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
        const user = new User(req.body)
        user.save(function(err,result){
            if (err){
                console.log(err);
            }
            else{
                console.log(result)
            }
        })
    res.status(201).json({
        message: "User created"
    })
    }
})

//login
app.post('/login',(req,res)=>{
    const {emailId,password} =req.body;
    //console.log(emailId,password)
     User.findOne({emailId}).then(user=>{
       // console.log(user)
        if(user){
            
           if(password === user.password){
               res.send({message:"Logged in sucessfully",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send({message: "You are not registered"})
        }

    })
})


// update
app.patch('/editdetails/:id', async (req,res) => {
    console.log(req.body)
    const updateduser = await User.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Successfully updated the user',
            data : {
              updateduser
            }
          })
    }catch(err){
        res.status(500).json({
            status: 'Failed to update the user.',
            message : err
        })
    }
})




// For posts

app.post('/add-posts', async(req,res) => {
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

app.get('/get-posts', async(req,res) => {
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

app.patch('/update-post/:id', async (req,res) => {
  const updatedposts = await Post.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators : true
    })
  try{
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

app.delete('/delete-post/:id', async(req,res) => {
  await Post.findByIdAndDelete(req.params.id)
  
  try{
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

//Questions

app.post('/add-question', async(req,res) => {
  
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

app.get('/get-questions', async (req,res) => {
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

app.patch('/update-question/:id', async (req,res) => {
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


app.delete('/delete-question/:id', async(req,res) => {
  await Question.findByIdAndDelete(req.params.id)
  
  try{
    res.status(204).json({
        status : 'Successfully deleted',

        data : {}
    })
  }catch(err){
      res.status(500).json({
          status: 'Failed to delete the question',
          message : err
      })
  }
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})