import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import UserCard from '../components/UserCard'
import EditProfile from '../pages/EditProfile'

import { AuthContext } from '../context/auth'
import { useContext } from 'react'

export default function UserDetails() {

    const [users, setUser] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`/api/userprofile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(response => {
            setUser(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Your Profile</h1>
            <UserCard />
            <EditProfile />
            
           
            


        
        </div>
    )
}