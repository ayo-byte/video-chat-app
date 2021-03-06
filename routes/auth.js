const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.js')
//const io = require('../server').io

const saltRounds = 10

// Sign Up
router.post('/signup', (req, res, next) => {
    const {email, password, username } = req.body;

    if (email === '' || password === '' || username === '') {
        res.status(400).json({message : 'Provide email, password and name.'})
        return;
    }
    // validate email
    const emailValid = email.includes('@')
    if (!emailValid) {
        res.status(400).json({message: 'Provide a valid email address.'});
        return;
    }
  // validate password format
    if (password.length < 6) {
        res.status(400).json({message: 'Password needs 6 chars'})
        return;
    } 
    // user input is valid
    // check if user exists already
    User.findOne({email})
    .then(foundUser => {
        if (foundUser) {
            res.status(400).json({message: 'User already exists'})
            return;
        }
        // email is unique -> hash password and create user
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
        console.log(email, username, password)
    return User.create({email: email, username: username, password: hash})
    })
    .then(createdUser => {
       const {email, username, _id} = createdUser;
       const user = {email, username, _id}

       // send a response with the created user that doesnt contaon the password
       res.status(201).json({ user: user })
       return;

    })
    .catch(err => {
        next(err)
        res.status(500).json({message: 'Internal Server Error'})
        return;
    })
    
});

//login
router.post('/login', (req, res, next) => {
	const { email, password } = req.body

	// Check if email or password or name are provided as empty string 
	if (email === '' || password === '') {
		res.status(400).json({ message: "Provide email and password" });
		return;
	}

	User.findOne({ email })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: "User not found" });
				return;
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { _id, email, username } = foundUser
				const payload = { _id, email, username }

				// create the json web token
				const authToken = jwt.sign(
					payload,
					process.env.TOKEN_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)

                //get socketId here so it can be applied to db
                // io.on("connection", (socket) => {
                //     let socketId = socket.id;
                //     console.log('socketid is :', socketId)
                //     socket.emit("me", socket.id);
                  
                //     socket.on("disconnect", () => {
                //       socket.broadcast.emit("callEnded")
                //     });
                  
                //     socket.on("callUser", ({ userToCall, signalData, from, name }) => {
                //       io.to(userToCall).emit("callUser", { signal: signalData, from, name });
                //     });
                  
                //     socket.on("answerCall", (data) => {
                //       io.to(data.to).emit("callAccepted", data.signal)
                //     });
                //   });
                  
				res.status(200).json({ authToken: authToken, username: username })
                console.log('response is 200 and here are token and username',res)
                return;
			}
			else {
				res.status(401).json({ message: "Unable to authenticate user" });
                return;
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "Internal Server Error" })
            return;
		})
});

router.get('/verify', isAuthenticated, (req, res, next) => {
	// if the token is valid we can access it on : req.payload
	console.log('request payload: ', req.payload)
	res.status(200).json(req.payload)
    return;
});


module.exports = router;