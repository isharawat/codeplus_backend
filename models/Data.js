const mongoose =require('mongoose')

//User Schema 
const dataSchema=new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    admin:{
        type:String,
        require:true
    },
    questions: [{           
            url : String,
            rating: Number,
            name: String,
            points : Number,
        }
    ],
    user:[{
      //for future  userId:String,
        codeForces:{
            type:String,
            unique:true
        },
        points:Number
    }]
    
})

//create Model
const Data= mongoose.model("Data", dataSchema)

module.exports = Data;

