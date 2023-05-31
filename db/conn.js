const mongoose = require('mongoose');

const db=process.env.DATABASE || "mongodb://127.0.0.1:27017"

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e);
})