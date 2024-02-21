const mongoose =require('mongoose')

const postschema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
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
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:{
        type:Map,
        of: Boolean
    }, 
    comments:{
        types: Array, 
        default : []
    }
}, {timestamp: true}
)

const Post = mongoose.model("Post", postschema)
module.exports = Post