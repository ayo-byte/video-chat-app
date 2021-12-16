import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { SocketContext } from '../context/socket';

export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const { loginUser } = useContext(AuthContext)

	const socket = useContext(SocketContext)

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }

		axios.post('/auth/login', requestBody)
			.then(response => {
				// redirect -> friends
				// navigate('/login')
				console.log('i have a token', response.data.authToken)
				const token = response.data.authToken
				const username = response.data.username
				// call login user function from auth context
				loginUser(token)
				socket.setUp()
				console.log(typeof socket.me, 'SOCKETME',socket.me)
				console.log('this is the username after login', username)
				
				//await?
				axios.put(`/api/userprofile/addsocketid/${username}`, {socketId : socket.me} ,{
					headers: { Authorization: `Bearer ${token}`},
				  })
				.then(response => {
					// return response.data
					console.log('updatedSocket')
				})
				.catch(err => console.log(err))

				navigate('/')
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label className="spacing">Email: </label>
				<input className="spacing input-border" type="text" name="email" value={email} onChange={handleEmail} />
				<br></br>
				<label className="spacing">Password: </label>
				<input className="spacing input-border" type="password" value={password} onChange={handlePassword} />

				<button type="submit">Log in</button>
			</form>

			{errorMessage && <p>{errorMessage}</p>}

			<p>Don't have an account?</p>
			<Link to='/signup'>Signup</Link>
		</div>
	)
}