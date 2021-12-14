import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

export default function Navbar() {

	const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

	// console.log('user', user)

	return (
		<nav>
			<Link to='/friends'>
				<button>Friends</button>
			</Link>
			{isLoggedIn ?
				(
					<>
						<Link to='/userprofile'>
							<button>Profile</button>
						</Link>
						<button onClick={logoutUser}>Logout</button>
					</>
				) : (
					<>
						<Link to='/signup'>
							<button>Signup</button>
						</Link>
						<Link to='/login'>
							<button>Login</button>
						</Link>
					</>
				)}
		</nav>
	)
}