const mongoose =require('mongoose')
const jwt= require('jsonwebtoken')
const bcryptjs= require('bcryptjs')

//User Schema 
const userSchema=new mongoose.Schema({
    
    emailId : {
        type: String,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    codechef:{
        type: String,
        required: true
    },
    leetcode:{
        type: String,
        required: true
    },
    codeForces:{
        type: String,
        required: true
    },
    atCoder:{
        type: String,
        required: true
    },
    hackerEarth:{
        type: String,
        required: true
    },    
    isAdmin: {
        type: Boolean,
        required: true
    },
    isLoggedin: {
        type: Boolean,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

//Hashing password



//create Model
const User= mongoose.model("User", userSchema)

module.exports = User;

