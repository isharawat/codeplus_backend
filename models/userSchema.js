const mongoose =require('mongoose')
const jwt= require('jsonwebtoken')
const bcryptjs= require('bcryptjs')

//User Schema 
const userSchema=new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tokens : [
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
})

//Hashing password

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=bcryptjs.hashSync(this.password,10);
        
    }
    next();
})


//create Model
const User= new mongoose.model("User", userSchema);

module.exports = User;

