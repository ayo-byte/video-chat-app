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
    const { email, username, password } = req.body
    User.create({email, username, password })
        .then(user => {
        res.status(201).json(user)
    })
    .catch(err => next(err))
});

// get all friends
router.get('/friends', (req, res, next) => {
	User.find()
		.then(friends => {
			res.status(200).json(projects)
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

router.put('/edit/:id', (req, res, next) => {
    const {email, username, password } = req.body
    User.findByIdAndUpdate(req.params.id, {
        email, username,password 
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

//adding friend
//adding friend
router.put('/add', (req, res, next) => {
    const { username } = req.body;
  
    User.findOne({ username: username })
      .then((addedFriend) => {
      //   console.log('the friend', addedFriend);
        let friendId = addedFriend._id;
      //   console.log('friendID', friendId);
        User.findByIdAndUpdate(
          req.payload._id,
          {
            $push: { friends: friendId },
          },
          { new: true }
        )
          .then((user) => {
            console.log('the user', user);
            res.status(200).json(user);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  });
// router.put('/friends/:id', (req, res, next) => {
//     const friendId = req.params.id;
//       User.findByIdAndUpdate(req.paylad.id),
//         { $push: { friends: friendId } },
//         { new: true }
//         .then((collectionFromDB) => {
//           res.status(200).json(collectionFromDB);
//         })
//         .catch((err) => {
//           next(err);
// });
  
// router.put('addFriend/:id', (req, res, next) => {
//     //const { friendId } = req.body
//     const friendId = req.payload.id
//     const selfId = req.params.id

//     User.findByIdAndUpdate(selfId, {
//         friends: $put friendId
//     }, { new: true})
//     User.findByIdAndUpdate(friendId, {
//         friends: $put selfId
//     }, { new: true})
//     .then(updatedUser => {
//         res.status(200).json(updatedUser)
//     })
//     .catch(err => next(err))
// });

module.exports = router;