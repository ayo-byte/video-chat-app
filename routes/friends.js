const router = require('express').Router()
const { post } = require('.');
const Friends = require('../models/Friends');

// get all friends
router.get('/', (req, res, next) => {
    Friends.find()
    .then(friends => {
        res.status(200).json(friends)
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    const { name, lastName } = req.body
    Friends.create({ name, lastName })
        .then(friends => {
        res.status(201).json(friends)
    })
    .catch(err => next(err))
});

//get a specific friend

router.get('/:id', (req, res, next) => {
    Friends.findById(req.params.id)
    .then(friends => {
        // check for a valid mongo object id
        // mongoose.Types.ObjectId.isValid(req.params.id)
        if (!friends) {
            res.status(404).json(friends)
        } else {
            res.status(200).json(friends)
        }
    })
    .catch(err => next(err))
    
});

// update (makes less sense for friendlist; only delete option should work here)

router.put('/:id', (req, res, next) => {
    const { name, lastName } = req.body
    Friends.findByIdAndUpdate(req.params.id, {
        name,
        lastName
    }, { new: true})
    .then(updatedFriend => {
        res.status(200).json(updatedFriend)
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
    Friends.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({message: 'friend deleted'})
    })
    .catch(err => next(err))
});

module.exports = router;

//get all tasks for a specific project
// /api/projects/:id/tasks