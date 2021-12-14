import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import User from '../../../models/User.model'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'

export default function FindFriend() {

    const [friend, setFriend] = useState(null)

    const {id} = useParams()

    useEffect(() => {
       
        axios.get(`/api/userprofile/${id}`)
        .then(response => {
            setFriend(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
        {User && (
            <>

                <h3>{userprofile.name} {userprofile.lastName}</h3>

                
            </>
        )}
        
        </div>
    )
}