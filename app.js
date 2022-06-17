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
const User = require('./models/userSchema');

const Question = require('./models/Question');

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Registration
app.post('./register',(req,res)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const createUser= new User({
            username : username,
            email : email,
            password : password
        });
        
        res.status(200).send("Registered");
    }
    catch(error){
        res.status(400).send(error)
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