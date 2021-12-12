const router = require('express').Router()
const { post } = require('.');
const User = require('../models/User.model');

// get all friends
// router.get('/', (req, res, next) => {
//     Friends.find()
//     .then(friends => {
//         res.status(200).json(friends)
//     })
//     .catch(err => next(err))
// });

router.post('/userProfile', (req, res, next) => {
    const { name, lastName, email, username, dateOfBirth, password } = req.body
    User.create({ name, lastName, email, username, dateOfBirth, password })
        .then(user => {
        res.status(201).json(user)
    })
    .catch(err => next(err))
});

//get a specific friend

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        // check for a valid mongo object id
        // mongoose.Types.ObjectId.isValid(req.params.id)
        if (!user) {
            res.status(404).json(user)
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => next(err))
    
});

router.put('/:id', (req, res, next) => {
    const { name, lastName, email, username, dateOfBirth, password } = req.body
    User.findByIdAndUpdate(req.params.id, {
        name,
        lastName,
        email, username, dateOfBirth, password 
    }, { new: true})
    .then(updatedUser => {
        res.status(200).json(updatedUser)
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({message: 'Profile deleted'})
    })
    .catch(err => next(err))
});

module.exports = router;