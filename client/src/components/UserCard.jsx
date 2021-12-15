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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { id } = useParams()
    console.log(id)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/userprofile/edit/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            const {username, email, password} = response.data
            setUsername(username)
            setEmail(email)
            setPassword(password)

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

    return (
        <div>
            {user &&(
                <>
                 <p>Username: {user.username}</p>
                 <p>Email: {user.email}</p>
                 
                 {/* <h1>Edit Friend</h1> */}
                {/* <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={name} onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="lastName">Lastname: </label>
                    <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <button type="submit">Update this Friend</button>
                </form> */}
                {/* <button onClick={deleteFriend}>Delete Friend</button> */}
                <form  onSubmit={handleSubmit}>
                    <button type="submit">Edit Profile</button>
                </form>
                <h3>My Friends</h3>
                <div>
                <form id="form"> 
                    <input type="search" id="query" name="q" placeholder="Find a Friend..."/>
                    <button>Search</button>
                </form>
                </div>
                
               
                <p>{user.friends}</p>
                </>
           )} 
            
            
        </div>
    )
}

