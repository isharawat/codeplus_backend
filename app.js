const express = require('express')
const cors = require('cors')
const app = express()
const authRouter=require('./routes/auth');
const postRouter=require('./routes/post');
const discussRouter=require('./routes/discuss');
const quesRouter=require('./routes/ques');
const womenRouter=require('./routes/women');
const lockoutRouter=require('./routes/data');
app.use(express.json())
app.use(cors())
//routes
app.use('/auth',authRouter)
app.use('/posts',postRouter)
app.use('/discussion',discussRouter)
app.use('/questions',quesRouter)
app.use('/women-section', womenRouter)
app.use('/lockoutbot', lockoutRouter)

const port = 3001;
const dotenv= require('dotenv');
dotenv.config({path: './config.env'});
require('./db/conn');


// require model
var User = require('./models/User');


app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})