
   
import React from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export default function UserCard({name, _id}) {
    const { loginUser, user } = useContext(AuthContext)
    console.log(user)
    const storedToken = localStorage.getItem('authToken');
    const [username, setUsername] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [friends, setFriends] = useState('')


    const { id } = useParams()
    console.log('id is the following',id)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            console.log('response is the following',response.data)
            const {username, email, password, friends, displayName} = response.data
            setUsername(username)
            setEmail(email)
            setPassword(password)
            setFriends(friends)
            setDisplayName(displayName)

        })
        .catch(err => console.log(err))
    }, [])
    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = {username, email, password}
        axios.put(`/api/userprofile/edit/${id}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            // this is a redirect using react router
            return response.data
            navigate(`/userprofile/${id}`)
            console.log('updated')
        })
    }

    // const removeFriend = (e) => {
    //     e.preventDefault();
    //     // send a post request with the data from the state to the server
    //     //to create new friend
    //     const requestBody = { username: friend, user: user };
    //     //console.log('the body', requestBody);
    //     axios
    //       .delete('/api/userprofile/remove', requestBody, {
    //         headers: { Authorization: `Bearer ${storedToken}` },
    //       })
    //       .then((response) => {
    //         console.log(response);
    
    //         setUsername('');
        
    //       })
    //       .catch((err) => console.log(err));
    //     }
    // const removeFriend = () => {
	// 	axios.delete(`/api/userprofile/${id}`)
	// 		.then(() => {
	// 			// redirect to the projects list 
	// 			navigate('/projects')
	// 		})
	// 		.catch(err => console.log(err))
	// }
    if (friends === ''){
        return <></>
    }
    return (
        <div>
            {user &&(
                <>
                 <p>Username: {username}</p>
                 <p>Display Name: {displayName}</p>
                 <p>Email: {email}</p>
                <Link to={`/userprofile/edit/${id}`}>
                    <button type="submit">Edit Profile</button>
                </Link>
                
                <h3>My Friends</h3>
                <div>
                   
                 {friends.map(friend => 
                    <p>
                        {/* <a href={`/userprofile/${friend}`}>{friend}</a> */}
                        <p>{friend}</p>

                        {/* <form onSubmit={removeFriend}>
                         <input id="name" type="text" value={friend}/>
             
                         <button type="submit">Remove this Friend</button>
           </form>  */}
                        
                    </p>)}
                </div>

                <div>
                {/* <form id="form"> 
                    <input type="search" id="query" name="q" placeholder="Find a Friend..."/>
                    <button>Search</button>
                </form> */}
                </div>
                
                </>
           )} 
            
            
        </div>
    )
}

