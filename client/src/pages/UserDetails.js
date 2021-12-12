import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function UserDetails() {

    const [user, setUser] = useState(null)

    const {id} = useParams()

    useEffect(() => {
       
        axios.get(`/api/userProfile`)
        .then(response => {
            setUser(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>User</h1>
        {user && (
            <>
                    
                <h3>{user.name} {user.lastName}</h3>

                
            </>
        )}
        
        </div>
    )
}