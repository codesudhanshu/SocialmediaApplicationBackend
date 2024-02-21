const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User =require('../Models/User')

const register = async(req,res)=>{
    try{
        const {firstName, lastName, email, phoneNumber, password, picturePath, friends, location, occupation} = req.body
        const salt = await bcrypt.genSalt()
        const passwordhash = await bcrypt.hash(password,salt)
        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            password: passwordhash, 
            picturePath, 
            friends, 
            location, 
            occupation, 
            viewdProfile: Math.floor(Math.random()*1000),
            impressions: Math.floor(Math.random()*1000)
        })
        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = register


const login = async( req, res) =>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({auth: false, message:'No user found'})
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(401).json({auth:false, message:"Password does not match"})
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        delete user.password
        res.status(200).json({token, user})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = login