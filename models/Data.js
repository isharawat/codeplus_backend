const mongoose =require('mongoose')

//User Schema 
const dataSchema=new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    questions: [{           
            url : String,
            points : Number,
        }
    ],
    
    
})

//create Model
const Data= mongoose.model("Data", dataSchema)

module.exports = Data;

