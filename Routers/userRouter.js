const express = require('express')

const {getUser, getUserFriends, addRemoveFriend}  = require('../Controller/userController')
const auth = require("../Middlewares/auth")

const router = express.Router()

router.get("/:id",auth,getUser)
router.get("/:id/friends", auth, getUserFriends)
router.patch("/:id/:friendId", auth, addRemoveFriend)

module.exports = router