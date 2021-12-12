const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')

const saltRounds = 10

// Sign Up
router.post('/signup', (req, res, next) => {
    const {email, password, name } = req.body
    if (email === '' || password === '' || name === '') {
        res.status(400).json({message : 'Provide email, password and name.'})
        return
    }
    // validate email
    // if (!email.includes('@')){
    //     res.status(400).json({message: 'Provide a valid email address'})
    //     return
    // }
    if (password.length < 6) {
        res.status(400).json({message: 'Password needs 6 chars'})
        return
    } 
    // user input is valid
    // check if user exists already
    User.findOne({email})
    .then(foundUser => {
        if (foundUser) {
            res.status(400).json({message: 'User already exists'})
            return
        }
        // email is unique -> hash password and create user
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.genSaltSync.hashSync(password, salt)

    return User.create({email, name, password: hash})
    })
    .then(createdUser => {
       const {email, name, _id} = createdUser
       const user = {email, name, _id}

       // send a response with the created user that doesnt contaon the password
       res.status(201).json({ user: user })

    })
    .catch(err => {
        next(err)
        res.status(500).json({message: 'Internal Server Error'})
    })
    
});

module.exports = router;