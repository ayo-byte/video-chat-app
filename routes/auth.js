const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.js')

const saltRounds = 10

// Sign Up
router.post('/signup', (req, res, next) => {
    const {email, password, name } = req.body;

    if (email === '' || password === '' || name === '') {
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

    return User.create({email, name, password: hash})
    })
    .then(createdUser => {
       const {email, name, _id} = createdUser;
       const user = {email, name, _id}

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
				const { _id, email, name } = foundUser
				const payload = { _id, email, name }

				// create the json web token
				const authToken = jwt.sign(
					payload,
					process.env.TOKEN_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken: authToken })
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