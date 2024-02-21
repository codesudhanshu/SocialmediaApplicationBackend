const mongoose = require('mongoose')

const userschema = mongoose.Schema(
    {
        firstName: {
            type:String,
            required: true,
            min:2,
            max:50   
        }, 
        lastName:{
            type:String,
            required: true,
            min:2,
            max:50   
        }, 
        email:{
            type:String,
            required: true,
            min:2,
            max:50,
            unique:true   
        },
        phoneNumber:{
            type:String,
            required: true,
            max:50 ,
        },
        password:{
            type:String,
            required: true,
            min:8,
            max:50   
        },
        picturePath: {
            type:String,
            default:"",
        },
        friends:{
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewProfile: Number,
        impressions: Number,
}, {timestamp: true})

const User = mongoose.model("User",userschema)
module.exports = User