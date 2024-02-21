const express = require('express')

const {getFeedPosts, getUserPosts, likePost} = require("../Controller/createpost")
const auth = require('../Middlewares/auth')

const router = express.Router()

router.get("/", auth, getFeedPosts)
router.get("/userId/posts", auth , getUserPosts)
router.patch("/:id/like", auth, likePost)

module.exports = router