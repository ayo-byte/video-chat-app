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
    const [friends, setFriends] = useState('')


    const { id } = useParams()
    console.log('id is the following',id)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            console.log('nblablablablabla')
            console.log('response is the following',response.data)
            const {username, email, password, friends} = response.data
            setUsername(username)
            setEmail(email)
            setPassword(password)
            setFriends(friends)

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
                 <p>Username: {username}</p>
                 <p>Email: {email}</p>
                <form  onSubmit={handleSubmit}>
                    <button type="submit">Edit Profile</button>
                </form>
                <h3>My Friends</h3>
                <div>
                {friends.map(friend => <p>{friend}</p>)} 
                </div>

                <div>
                <form id="form"> 
                    <input type="search" id="query" name="q" placeholder="Find a Friend..."/>
                    <button>Search</button>
                </form>
                </div>
                
                <p>List of friends should be displayed here</p>
                <p>{user.friends}</p>
                </>
           )} 
            
            
        </div>
    )
}

