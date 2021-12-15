import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'


export default function EditProfile() {
    const storedToken = localStorage.getItem('authToken');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const { id } = useParams()
    console.log(id)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            const {username, email} = response.data
            setUsername(username)
            setEmail(email)
            //setPassword(password)

        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = {username, email}
        axios.put(`/api/userprofile/${id}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            // this is a redirect using react router
            // return response.data
            navigate(`/userprofile/${id}`)
            console.log('updated')
        })
    }

    const deleteProfile = () => {
        axios.delete(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(() => {
            // redirect to friend list
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="email"> Email: </label>
            <input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            {/* <label htmlFor="password">Password: </label>
            <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)}/> */}
            <button type="submit">Update my Profile</button>
        </form>
        <button onClick={deleteProfile}>Delete my Profile</button>
     </div>
    
    )
}