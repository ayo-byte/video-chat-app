import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'

export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const { loginUser } = useContext(AuthContext)

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }

		axios.post('/auth/login', requestBody)
			.then(response => {
				// redirect -> projects
				// navigate('/login')
				console.log('i have a token mothafuckas', response.data.authToken)
				const token = response.data.authToken
				// call login user function from auth context
				loginUser(token)
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
				<label>Email: </label>
				<input type="text" name="email" value={email} onChange={handleEmail} />
				<label>Password: </label>
				<input type="password" value={password} onChange={handlePassword} />

				<button type="submit">Log in</button>
			</form>

			{errorMessage && <p>{errorMessage}</p>}

			<p>Don't have an account?</p>
			<Link to='/signup'>Signup</Link>
		</div>
	)
}