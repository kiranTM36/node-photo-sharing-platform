const express = require('express')
const postModel = require('../model/postModel')
const upload = require('./../middleware/upload')

const router = express.Router()

// Create post with image
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const newPost = new postModel({
            title: req.body.title,
            caption: req.body.caption,
            image: req.file ? req.file.path : null,  // must match model
             userId: req.session.user.id 
        })

        const saved = await newPost.save()

        res.json({
            message: "Post created ✅",
            data: saved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating post" })
    }
})

module.exports = router