
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'


export default function Signup() {
    const { user } = useContext(AuthContext);

	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)
	const storedToken = localStorage.getItem('authToken');

	const navigate = useNavigate()

	const handleEmail = e => setEmail(e.target.value)
	const handleUsername = e => setUsername(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, username }

		axios.post('/auth/signup', requestBody, {
			headers: { Authorization: `Bearer ${storedToken}`}
		})
			.then(response => {
				// redirect -> login 
				navigate('/login')
			})
			.catch(error => {
				const errorDescription = error.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	return (
		<div className="column">
			<h1>Signup</h1>
			<form onSubmit={handleSubmit}>
				<label className="spacing">Email: </label>
				<input className="spacing input-border" type="text" name="email" value={email} onChange={handleEmail} />
				<br></br>
				<label className="spacing">Password: </label>
				<input className="spacing input-border" type="password" value={password} onChange={handlePassword} />
				<br></br>
				<label className="spacing">Username: </label>
				<input className="spacing input-border" type="text" value={username} onChange={handleUsername} />
				<br></br>
				<button type="submit">Sign Up</button>
			</form>

			{errorMessage && <p>{errorMessage}</p>}

			<p>Already have an account?</p>
			<Link to='/login'>Login</Link>
		</div>
	)
}