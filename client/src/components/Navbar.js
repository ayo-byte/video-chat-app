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
			
			
			{isLoggedIn ?
				(
					<>
					<Link to='/'>
				<button className="nav-btn">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-camera-reels-fill" viewBox="0 0 16 16">
					<path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
					<path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
					<path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z"/>
				</svg>

				</button>
			</Link>
					<Link to='/friends'>
							<button className="nav-btn">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
									<path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
									<path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
								</svg>
								
							</button>
						</Link>
						< Link to= {`/userprofile/${user.username}`} >
							<button className="nav-btn">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
									<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
									<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
								</svg>
							</button>
						</Link>
						<button className="nav-btn" onClick={logoutUser}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
								<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
							</svg>
						</button>
						<br></br>
						<div className="user-display">
							<b className="font-green">User: {user.username}</b>

						</div>
					</>
				) : (
					<>
						<Link to='/signup'>
							<button className="nav-btn">Signup</button>
						</Link>
						<Link to='/login'>
							<button className="nav-btn">Login</button>
						</Link>
					</>
				)}
		</nav>
	)
}