const express = require('express')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')

const router = express.Router()

router.get('logout', (req,res) => {
    req.session.destroy()
    res.send("LogOut")
})

router.post('/signin',async (req, res) => {
    try {
        const data = req.body
        const newUser = new userModel(data)
        const response = await newUser.save()

        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Error")
    }
})

router.post('/login',async (req, res) => {
    try {
        const {username, password } = req.body
        const user =await userModel.findOne({username})

        if(!user)
            return res.json("No userFoound")

        const isMatchPass =await bcrypt.compare(password,user.password)
        if(!isMatchPass)
            return res.json("Password Error")

        req.session.user = {
            id : user._id,
            username : user.username
        }

        res.json("Welcome "+user.username)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Error")
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const response = await userModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({
            message: "User updated successfully ✅",
            user: response
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Error" })
    }
})
module.exports = router