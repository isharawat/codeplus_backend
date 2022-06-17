const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type : String,
        required : true
    },
    url:{
        type : String,
        required : true
    },
    points: {
        type : Number,
        required : true
    }
})

const Question = mongoose.model('Question',questionSchema)

module.exports = Question