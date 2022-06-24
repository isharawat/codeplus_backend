const mongoose = require('mongoose')

const womenpostSchema = new mongoose.Schema({
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

const WomenPost = mongoose.model('WomenPost',womenpostSchema)

module.exports = WomenPost