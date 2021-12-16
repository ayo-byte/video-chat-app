import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

export default function Navbar() {

	const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

	console.log('we are in the navbar and the logged in user id is this', user)
	//const userId = user._id
	return (
		<nav>
			<Link to='/'>
				<button>Home</button>
			</Link>
			{isLoggedIn ?
				(
					<>
					<Link to='/friends'>
							<button>Friends</button>
						</Link>
						< Link to= {`/userprofile/${user.username}`} >
							<button>Profile</button>
						</Link>
						<button onClick={logoutUser}>Logout</button>
						<b>{user.username}</b>
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