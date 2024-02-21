const User = require("../Models/User")

const getUser = async(req,res) =>{
    try {
        const {id} = req.params
        const user  = await User.findOne({id}) 
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// module.exports = getUser


const getUserFriends = async(req,res) =>{
    try {
        const {id} = req.params
        const user  = await User.findOne({id}) 

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const fromattedfriend = friends.map(({
            _id, firstName, lastName, occupation, location, picturePath
        }))
        res.status(200).json(fromattedfriend)

        } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// module.exports = getUserFriends

const addRemoveFriend = async (req,res) =>{
    try {
        const {id, friendId} = req.params
        const user = await User.findOne(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)){
            User.friends = user.friends.filter((id)=> id!== friendId)
            friend.friends = friend.friends.filter((id) => id !==id)
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const fromattedfriend = friends.map(({
            _id, firstName, lastName, occupation, location, picturePath
        }))
        res.status(200).json(fromattedfriend)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = {
    getUser,
    getUserFriends,
    addRemoveFriend
};