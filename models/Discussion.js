const mongoose = require('mongoose')

const discussionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    comments : [{           
            comment : String,
            person : String
        }
    ],
    name:{
        type : String,
        required:true
    },
    
})

const Discussion = mongoose.model('Discussion',discussionSchema)

module.exports = Discussion